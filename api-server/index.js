const port = 4100;
const routes = [
  /* 0 */ { url: '/' },
  /* 1 */ { url: '/platform-game' },
  /* 2 */ { url: '/animation/1' },
  /* 3 */ { url: '/animation/2' },
  /* 4 */ { url: '/animation/3' },
  /* 5 */ { url: '/animation/4' },
  /* 6 */ { url: '/3d' }
];

const express = require('express');
const path = require('path');

const app = express();
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen

/**
 * for loading all the resources in the techieland index.html file
 * this method automatically handles all the paths in the folder
 */

app.use(express.static('./public'));

/** app.use(require('./my-body-parser'));
 * I have implemented my own http body-parser module
 * in order to understand the middleware process deeper.
 * The method works quite simply, it listenes to 'data'
 * event and when the event triggered it gets the
 * chunk (as http request is 'event' and 'readableStream')
 * of http body and pushes it to the local array. And it also
 * listened to 'end' event to which means that the readableStream
 * is finished and gathers the Buffer array and parses
 * it as queryString to the req.body itself.
 * 
 * The same built-in solution for the case in Express is:
 * app.use(express.urlencoded({ extended: false }));
 */

// app.use(require('./my-body-parser'));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Even no need to handle (app.get(routes[0].url, (req, res) => ..) the
 * index.html request app.use(express.static('./techieland')) handles
 * it itself without issues
 */

app.post('/post', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.get('/login', (req, res) => {
  // var body = [];
  // req.on('data', chunk => body.push(chunk));
  // req.on('end', chunk => {
  //   body = Buffer.concat(body).toString();
  //   res.send(body);
  // });
  res.send(req.body);
});

app.get(routes[0].url, (req, res) => {
  res.sendFile(path.resolve(__dirname, './techieland/index.html'));
});

/**
 * Routers one of the coolest functionalities of the Express framework!
 * now we can handled all the requests whose url is going to start
 * with '/api' in an other files.
 * 
 * We just simply call middleware function 'app.use()'
 * and include our starting url as a first parameter
 * and the router object as the second parameter
 * 
 * creating the router: 'router = express.Router();'
 * handling the router: 'router.get('/countries', (req, res) => ...'
 * It should be mentioned that the starting of the url '/api' is not included
 * in the router handler as it is already included in the middleware function
 * (app.use('/api', router);)
 */

router = express.Router();
router.get('/countries', (req, res) => {
  res.send('success!');
});
app.use('/api', router);

/**
 * This is for handling the 404 error when the server couldn't
 * find the requested url it will be handled automatically in the
 * following handler.
 * 
 * The star ('*') means any url which is not handled above will be
 * cought here. So, that's why, it should be written below all the request
 * handlers
 */
app.all('*', (req, res) => {
  res.status(404);
  res.send('<h1>resource not found</h1>');
});
  

app.listen(port, () => console.log(`server is listening on http://localhost:${port}`));
