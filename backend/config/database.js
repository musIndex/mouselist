import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host:'localhost', 
     database:'mouse_inventory',
     user:'mouseuser', 
     password:'password',
     connectionLimit: 5
});

export default pool;