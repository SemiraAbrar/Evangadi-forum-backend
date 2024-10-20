const mysql2 = require("mysql2");
require("dotenv").config();
const dbConnection = mysql2.createPool({
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
});


module.exports = dbConnection.promise()
