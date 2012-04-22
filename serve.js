(function() {
  var PORT, app, fs, http, path;
  http = require('http');
  fs = require('fs');
  path = require('path');
  PORT = 5001;
  app = http.createServer(function(request, response) {
    var contentType, extname, filePath, query;
    filePath = '.' + request.url;
    if (filePath === './') {
      filePath = './login';
    }
    if (typeof console !== "undefined" && console !== null) {
      console.log(filePath);
    }
    query = filePath.lastIndexOf('?');
    if (query > 0) {
      filePath = filePath.slice(0, query);
    }
    extname = path.extname(filePath);
    contentType = 'text/html';
    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpeg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.otf':
        contentType = 'application/x-font-opentype';
        break;
      case '.ttf':
        contentType = 'application/x-font-truetype';
    }
    return path.exists(filePath, function(exists) {
      if (!exists) {
        if (filePath === './404') {
          response.writeHead(404);
          response.end();
          return;
        } else {
          filePath = "app.html";
        }
      }
      return fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          return response.end();
        } else {
          response.writeHead(200, {
            'Content-Type': contentType
          });
          return response.end(content, 'utf-8');
        }
      });
    });
  });
  app.listen(PORT);
  if (typeof console !== "undefined" && console !== null) {
    console.log("Server running at http://127.0.0.1:" + PORT + "/");
  }
}).call(this);
