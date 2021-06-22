import { createRequire } from 'module';
const require = createRequire(import.meta.url);
//const port = process.env.PORT || 5000;
const mariadb = require('mariadb');

//localhost

const pool = mariadb.createPool({
     
     host:'localhost', 
     database:'mouse_inventory',
     user:'mouseuser', 
     password:'password',
     connectionLimit: 5
     }  

);


/*
const pool = mariadb.createPool({
     host: 'process.env.DB_HOST', 
     database:'process.env.DB_NAME',
     user: 'process.env.DB_USER', 
     password: 'process.env.DB_PASSWORD',
     connectionLimit: 5 });
pool.getConnection()
    .then(conn => {
      console.log("connected ! connection id is " + conn.threadId);
      conn.release(); //release to pool
    })
    .catch(err => {
      console.log("not connected due to error: " + err);
    });
    //*/
export default pool;