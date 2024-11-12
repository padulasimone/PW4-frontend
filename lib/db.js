// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Spunzio2001',
  database: 'pasticceria',
});

export default pool;
