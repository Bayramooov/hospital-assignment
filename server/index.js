// // env constants
// const PORT = 4100;

// // Simple database immitation
// const ROUTES = [
//   {
//     route_name: '/',
//     response: `
//     <h1>Home page</h1>
//     <ul>
//       <li><h3><a href="/about">About</a></h3></li>
//       <li><h3><a href="/contact">Contact</a></h3></li>
//       <li><h3><a href="/persons">Persons</a></h3></li>
//       <li><h3><a href="/countriess">Countries</a></h3></li>
//     </ul>
//     `
//   },
//   {
//     route_name: '/about',
//     response: `
//     <h1>About page</h1>
//     <h3><a href="/">Home</a></h3>
//     `
//   },
//   {
//     route_name: '/contact',
//     response: `
//     <h1>Contact page</h1>
//     <h3><a href="/">Home</a></h3>
//     `
//   },
//   {
//     route_name: '/persons',
//     response: `
//     <h1>Persons lists</h1>
//     <h3><a href="/">Home</a></h3>
//     `
//   },
//   {
//     route_name: '/countries',
//     response: `
//     <h1>Countries lists</h1>
//     <h3><a href="/">Home</a></h3>
//     `
//   }
// ];
// const NOT_FOUND = `
// <h1>404 not found!</h1>
// <h3><a href="/">Home</a></h3>
// `;

// // App
// const http = require('http');

// const server = http.createServer((req, res) => {
//   var r = ROUTES.find(r => r.route_name == req.url);

//   if (r) {
//     res.writeHead(200, { 'content-type': 'text/html' });
//     res.write(r.response);
//     res.end();

//   } else {
//     res.writeHead(404, { 'content-type': 'text/html' });
//     res.write(NOT_FOUND);
//     res.end();
//   }
// });

// server.listen(PORT, () => {
//   console.log(`listening on http://localhost:${PORT}`);
// });




const http = require('http');

const server = http.createServer((request, response) => {
  const { headers, method, url } = request;
  const userAgent = headers['user-agent'];

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
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('something1_id', '19');
    response.setHeader('something2_id', '1595');
    response.setHeader('something3_id', 1595);
    // response.setHeader('Content-Type', 'text/html');

    // or
    // response.writeHead(200, {
    //   'Content-Type': 'application/json',
    //   'X-Powered-By': 'bacon'
    // });


    response.write(JSON.stringify({ headers, method, url, body, chunk_count: count }, null, 4));
    // response.write('<html>');
    // response.write('<body>');
    // response.write('<h1>Hello, World!</h1>');
    // response.write('</body>');
    // response.write('</html>');
    response.end();

    // or
    // response.end('<html><body><h1>Hello, World!</h1></body></html>');  

  });
}).listen(4100);
