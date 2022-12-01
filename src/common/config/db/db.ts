import mysql from "mysql2";
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  port: 3306,
});
