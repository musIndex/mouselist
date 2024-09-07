import mysql from 'mysql2/promise';

const host1 = process.env.DB_HOST || 'localhost';
const port1 = process.env.DB_PORT || 3306;
const database1 = process.env.DB_NAME || 'mouse_inventory';
const user1 = process.env.DB_USER || 'admin';
const password1 = process.env.DB_PASSWORD || 'password';

const pool = mysql.createPool({
    host : host1 ,
    user: user1,
    database: database1,
    port: port1,
    password: password1,
    ssl: { rejectUnauthorized: true, ca: Buffer.from(process.env.SSL_CERT, "base64").toString("ascii") },
    connectionLimit: 5,
    waitForConnections: true
  });
  
  pool.getConnection()
  .then(conn => {
    console.log("connected! connection id is " + conn.threadId);
    conn.release(); // release to pool
  })
  .catch(err => {
    console.log("not connected due to error: " + err);
  });
  

export default pool;

