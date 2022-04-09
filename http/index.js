// env constants
const PORT = 4100;

// 
const { readFileSync } = require('fs');

// get all files
const homePage = readFileSync('../frontend/index.html');

// Simple database immitation
const ROUTES = [
  {
    route_name: '/',
    response: homePage
  },
  {
    route_name: '/about',
    response: `
    <h1>About page</h1>
    <h3><a href="/">Home</a></h3>
    `
  },
  {
    route_name: '/contact',
    response: `
    <h1>Contact page</h1>
    <h3><a href="/">Home</a></h3>
    `
  },
  {
    route_name: '/persons',
    response: `
    <h1>Persons lists</h1>
    <h3><a href="/">Home</a></h3>
    `
  },
  {
    route_name: '/countries',
    response: `
    <h1>Countries lists</h1>
    <h3><a href="/">Home</a></h3>
    `
  }
];
const NOT_FOUND = `
<h1>404 not found!</h1>
<h3><a href="/">Home</a></h3>
`;


const http = require('http');
var query = require('url'); // organib chiqish kerak
var util = require('util'); // organib chiqish kerak

const server = http.createServer((request, response) => {
  const { headers, method, url } = request;
  const userAgent = headers['user-agent'];
  
  var q = query.parse(url, true);

  let body = [];
  let count = 0;
  request.on('error', err => console.error(err.stack));
  request.on('data', chunk => {
    body.push(chunk);
    count++;
  });
  request.on('end', () => {
    body = Buffer.concat(body).toString();

    //////////////////////////////////////////////////
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    // response.setHeader('Content-Type', 'text/css');
    // response.setHeader('Content-Type', 'text/javascript');
    // response.setHeader('Content-Type', 'image/svg+xml');
    // response.setHeader('Content-Type', 'application/json');
    // response.setHeader('Content-Type', 'text/plain');
    response.setHeader('something1_id', '19');
    response.setHeader('something2_id', '1595');
    response.setHeader('something3_id', 1595);

    // or
    // response.writeHead(200, {
    //   'Content-Type': 'application/json',
    //   'X-Powered-By': 'bacon'
    // });

    if (url === '/') {
      response.write(homePage);
    }

    // response.write(JSON.stringify({ headers, method, url, body, chunk_count: count, q: q, util: util }, null, 4));
    // response.write('<html>');
    // response.write('<body>');
    // response.write('<h1>Hello, World!</h1>');
    // response.write('</body>');
    // response.write('</html>');
    response.end();

    // or
    // response.end('<html><body><h1>Hello, World!</h1></body></html>');  

  });
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});