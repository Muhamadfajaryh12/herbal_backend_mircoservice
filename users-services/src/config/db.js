const { createPool } = require("mysql2/promise");

require("dotenv").config();

const pool = createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Connected");
  connection.release();
});

module.exports = pool;
