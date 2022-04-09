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

app.use(express.static('./techieland'));

/**
 * Even no need to handle (app.get(routes[0].url, (req, res) => ..) the
 * index.html request app.use(express.static('./techieland')) handles
 * it itself without issues
 */

// app.get(routes[0].url, (req, res) => {
//   res.sendFile(path.resolve(__dirname, './techieland/index.html'));
// });

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
