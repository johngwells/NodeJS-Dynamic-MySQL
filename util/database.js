const Sequelize = require("sequelize");
// const mysql = require('mysql2');

require("dotenv").config();

const sequelize = new Sequelize("node-dynamic", "root", process.env.DB_PASS, {
  dialect: "mysql",
  host: "localhost"
});

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-dynamic',
//   password: process.env.DB_PASS
// });

// module.exports = pool.promise();
module.exports = sequelize;
