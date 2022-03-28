const mysql = require("mysql")

const pool  = mysql.createConnection ({
   connectionLimit : 10,
   host            : 'localhost',
   user            : 'root',
   password        : '3698741',
   database        : 'hospital'
 });

 module.exports = pool