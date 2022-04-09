const express = require('express');
const mysql = require('mysql');

const app = express();

/**
 * The code shown below is not meant for production use.
 * It’s merely to get you started with Node and MySQL.
 * In a production scenario, we must use connection pooling
 * to improve the performance of MySQL and not
 * overload the MySQL server with too many connections.
 * 
 * We are creating a MySQL connection on every request coming
 * from the user. Soon after getting multiple concurrent requests,
 * the MySQL server will get overloaded and throw an error.
 */

// const c = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'hospital'
// });

// c.connect(err => {
//   if (err) throw err;
//   console.log('Successfully connected to MySQL Server!');
// });

// app.get('/', (req, res) => {
//   c.query('select * from countries', (err, rows) => {
//     if (err) throw err;
//     res.send(`<pre>${JSON.stringify(rows, false, 4)}</pre>`);
//     c.end();
//   });

// }).listen(4100);


/**
 * Connection Pooling is a mechanism to maintain a cache of
 * database connection so that the connection can be reused
 * after releasing it.
 * 
 * Let’s rewrite our code to support connection pooling.
 */

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'hospital'
// });

// app.get('/', (req, res) => {
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     console.log(`connected as id ${conn.threadId}`);
//     conn.query('select * from countries', (err, rows) => {
//       conn.release(); // return the connection to the pool
//       if (err) throw err;
//       res.send(`<pre>${JSON.stringify(rows, false, 4)}</pre>`);
//     });
//   });
// }).listen(4100);

/**
 * Our server is effectively handling multiple requests
 * with ease. I have used this approach in multiple
 * production software solutions with heavy payload
 * and it works like charm.
 * 
 * Let’s learn how to execute various MySQL queries using Node.
 */

const pool = mysql.createPool({
  connectionLimit: 100, // important
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital',
  debug: false
});

function addRow(data) {
  let insertQuery = 'insert into ?? (??, ??) values (?, ?)';

  // The mysql.format function will perform the query escape.
  let query = mysql.format(insertQuery, ['countries', 'name', 'state', data.name, data.state]);

  /**
   * We can also use matrix syntax as a values parameter
   */
  // let values = [["Russia","A"],["USA","A"]]; // each array is one row
  // let query = mysql.format(insertQuery, ['countries', 'name', 'state', values]);
  
  pool.query(query, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    // rows added
    console.log(res.insertId);
  });
}

function queryRow(person_id) {
  let selectQuery = 'select * from ?? where ?? = ?';
  let query = mysql.format(selectQuery,["persons", "person_id", person_id]);
  pool.query(query, (err, data) => {
    if(err) {
      console.error(err);
      return;
    }
    // rows fetch
    console.log(data);
  });
}

function updateRow(data) {
  let updateQuery = "update ?? set ?? = ? where ?? = ?";
  let query = mysql.format(updateQuery,["countries", "name", data.name, "country_id", data.country_id]);
  pool.query(query, (err, response) => {
    if(err) {
      console.error(err);
      return;
    }
    // rows updated
    console.log(response.affectedRows);
  });
}

function deleteRow(country_id) {
  let deleteQuery = "delete from ?? where ?? = ?";
  let query = mysql.format(deleteQuery, ["countries", "country_id", country_id]);
  pool.query(query, (err, response) => {
    if(err) {
      console.error(err);
      return;
    }
    // rows deleted
    console.log(response.affectedRows);
  });
}

function callSP(spName) {
  let spQuery = 'call ??';
  let query = mysql.format(spQuery, [spName]);
  pool.query(query, (err, result) => {
    if(err) {
      console.error(err);
      return;
    }
    // rows from SP
    console.log(result);
  });
}

// setTimeout(() => {
//   addRow({
//     name: 'Russia',
//     state: 'A'
//   });
// }, 0);
