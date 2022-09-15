const config = require('../config');

//https://devhints.io/knex
module.exports.knex = require('knex')({
    client: 'pg',
    connection: {
      host : config.dbHost,
      port : 5432,
      user : config.dbUser,
      password : config.dbPassword,
      database : config.dbName
    }
  });