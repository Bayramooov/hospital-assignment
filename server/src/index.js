const express = require("express");
const { Pool } = require("pg")
const bodyParser = require('body-parser');

const app = express()

const pool  = new Pool ({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'postgres',
  password        : '1478963',
  database        : 'hospital'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function test (){
  const client = await pool.connect()

  const {rows} = await client.query('select * from countries')
  console.log(rows);
}

test()

// Routes


app.listen(4000, function () {
	console.log("Started application on port %d", 4000);
});
