require('dotenv').config();
module.exports.dbHost = process.env.DB_HOST || process.env.REACT_APP_DB_HOST
module.exports.dbUser = process.env.REACT_APP_DB_USER
module.exports.dbPassword = process.env.REACT_APP_DB_PASSWORD
module.exports.dbName = process.env.REACT_APP_DB_NAME
