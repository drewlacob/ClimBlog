const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3'); 
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const config = require('../config.js');

const s3Client = new S3Client({
    credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretAccessKey,
    },
    region: config.bucketRegion
})

module.exports = {
  uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
      Bucket: config.bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype
    }
  
    return s3Client.send(new PutObjectCommand(uploadParams));
  },

  deleteFile(fileName) {
    const deleteParams = {
      Bucket: config.bucketName,
      Key: fileName,
    }
  
    return s3Client.send(new DeleteObjectCommand(deleteParams));
  },

  async getObjectSignedUrl(key) {
    const params = {
      Bucket: config.bucketName,
      Key: key
    }
  
    const command = new GetObjectCommand(params);
    const seconds = 3600
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
  
    return url
  }
}