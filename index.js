var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
  var filePath = '';
  switch (req.url) {
    case '/':
      filePath = 'index.html';
      break;
    case '/about':
      filePath = 'about.html';
      break;
    case '/contact-me':
      filePath = 'contact-me.html';
      break;
    default:
      filePath = '404.html';
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        filePath = '404.html';
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(data);
          res.end();
        });
      } else {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    }
  });
}).listen(8080, () => {
  console.log('Listening on port 8080...');
});
