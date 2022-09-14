require('dotenv').config();
module.exports.dbHost = process.env.DB_HOST || process.env.REACT_APP_DB_HOST
module.exports.dbUser = process.env.REACT_APP_DB_USER
module.exports.dbPassword = process.env.REACT_APP_DB_PASSWORD
module.exports.dbName = process.env.REACT_APP_DB_NAME
module.exports.bucketName = process.env.BUCKET_NAME
module.exports.bucketRegion = process.env.BUCKET_REGION
module.exports.accessKey = process.env.ACCESS_KEY
module.exports.secretAccessKey = process.env.SECRET_ACCESS_KEY