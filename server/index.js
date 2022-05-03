var app = require("express")();
var bodyParser = require('body-parser');
var pool  = require('mysql').createPool({
  connectionLimit : 100,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'clinic'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function htmlJson(json) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hospital</title>
</head>
<body>
  <h2>
    <pre>${JSON.stringify(json, false, 2)}</pre>
  </h2>
</body>
</html>`;
}

// Routes
app.get("/", function(request, response) {
  response.send("Application server is working!");
});

app.get('/countries', (req, res) => {
  pool.query('call countries_load(null)', function (error, results, fields) {
    if (error) throw error;
    res.send(htmlJson(results[0]));
  });
});

app.get('/regions', (req, res) => {
  pool.query('call regions_load(null)', function (error, results, fields) {
    if (error) throw error;
    res.send(htmlJson(results[0]));
  });
});

app.get('/persons', (req, res) => {
  pool.query('call persons_load(null)', function (error, results, fields) {
    if (error) throw error;
    res.send(htmlJson(results[0]));
  });
});

app.listen(4100, function () {
	console.log("Started application on port %d", 4100);
});
