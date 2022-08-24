
const mysql = require('mysql'); 

const config = require('./../config/config');

// const USER =encodeURIComponent(config.dbUser);
// const PASSWORD =encodeURIComponent(config.dbPassword);
// const URI = ``

const pool = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
});

module.exports = pool
