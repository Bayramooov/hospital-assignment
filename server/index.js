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

// const http = require('http');
// var queryString = require('querystring');
// var uuu = require('url'); // organib chiqish kerak
// var util = require('util'); // organib chiqish kerak

// const server = http.createServer((request, response) => {
//   const { headers, method, url } = request;
//   const userAgent = headers['user-agent'];
  
//   var q = queryString.parse('country_id=1&region_id=112');
//   var k = uuu.parse(url, true);

//   let body = [];
//   let count = 0;
//   request.on('error', err => console.error(err.stack));
//   request.on('data', chunk => {
//     body.push(chunk);
//     count++;
//   });
//   request.on('end', () => {
//     body = Buffer.concat(body).toString();

//     //////////////////////////////////////////////////
//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'application/json');
//     response.setHeader('something1_id', '19');
//     response.setHeader('something2_id', '1595');
//     response.setHeader('something3_id', 1595);
//     // response.setHeader('Content-Type', 'text/html');

//     // or
//     // response.writeHead(200, {
//     //   'Content-Type': 'application/json',
//     //   'X-Powered-By': 'bacon'
//     // });


//     response.write(JSON.stringify({ headers, method, url, body, chunk_count: count, q: q, k: k, util: util }, null, 4));
//     // response.write('<html>');
//     // response.write('<body>');
//     // response.write('<h1>Hello, World!</h1>');
//     // response.write('</body>');
//     // response.write('</html>');
//     response.end();

//     // or
//     // response.end('<html><body><h1>Hello, World!</h1></body></html>');  

//   });
// });

// server.listen(PORT, () => {
//   console.log(`listening on http://localhost:${PORT}`);
// });















// /////////////////////////////////////////////////////////////////////
// writing
// /////////////////////////////////////////////////////////////////////
// const fs = require('fs');
// const file = fs.createWriteStream('./big_file.txt');

// for (let i = 0; i < 1e6; i++) {
//   file.write(`${i+1}. line of the big_file.txt\n`);
// }

// file.end();


// /////////////////////////////////////////////////////////////////////
// reading
// /////////////////////////////////////////////////////////////////////
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // const src = fs.createReadStream('./big_file.txt');
  // src.pipe(res);
 
  fs.readFile('./big_file.txt', (err, data) => {
    if (err) throw err;
  
    res.end(data);
  });

});

server.listen(4100);










// const fs = require('fs');

// var arr = [];

// async function logChunks(readable) {
//   for await (const chunk of readable) {
//     arr.push(chunk);
//     // console.log(chunk);
//   }

//   Buffer.concat(arr).toString();
// }

// const readable = fs.createReadStream('./test.txt', { encoding: 'utf8' });
// logChunks(readable);

// const Stream = require('stream');
// const readableStream = new Stream.Readable();

// readableStream.push('ping!');
// readableStream.push('pong!');
