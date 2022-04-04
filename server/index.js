// env constants
const PORT = 4100;

// Simple database immitation
const ROUTES = [
  {
    route_name: '/',
    response: `
    <h1>Home page</h1>
    <ul>
      <li><h3><a href="/about">About</a></h3></li>
      <li><h3><a href="/contact">Contact</a></h3></li>
      <li><h3><a href="/persons">Persons</a></h3></li>
      <li><h3><a href="/countriess">Countries</a></h3></li>
    </ul>
    `
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

// App
const http = require('http');

const server = http.createServer((req, res) => {
  var r = ROUTES.find(r => r.route_name == req.url);

  if (r) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(r.response);
    res.end();

  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write(NOT_FOUND);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
