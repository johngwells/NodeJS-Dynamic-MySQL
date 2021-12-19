const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-dynamic',
  password: process.env.DB_PASS
});

module.exports = pool.promise();