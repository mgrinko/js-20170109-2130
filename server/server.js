var http = require('http');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

function accept(req, res) {
  if (req.url.indexOf('/data/') === 0) {
    setTimeout(function() {
      file.serve(req, res);
    }, 100);
  } else {
    req.url = '/public' + req.url
    file.serve(req, res);
  }
}

http.createServer(accept).listen(3000);

console.log('Server running on port 3000');
