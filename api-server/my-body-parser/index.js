const q = require('querystring');
const formParse = (req, res, next) => {
  let body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', chunk => {
    req.body = q.parse(Buffer.concat(body).toString());
    next();
  });
}

module.exports = formParse;