const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

module.exports = dbConnection.promise()
