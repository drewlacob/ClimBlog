require('dotenv').config();
module.exports.dbHost = process.env.DB_HOST || process.env.REACT_APP_DB_HOST;
module.exports.dbUser = process.env.REACT_APP_DB_USER;
module.exports.dbPassword = process.env.REACT_APP_DB_PASSWORD;
module.exports.dbName = process.env.REACT_APP_DB_NAME;
module.exports.bucketName = process.env.AWS_BUCKET_NAME;
module.exports.bucketRegion = process.env.AWS_BUCKET_REGION;
module.exports.accessKey = process.env.AWS_ACCESS_KEY;
module.exports.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
