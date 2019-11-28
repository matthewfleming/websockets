const ws = require('ws');
const fs = require('fs');
const http = require('http');

const template = fs.readFileSync('template.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const client = fs.readFileSync('client.js', 'utf8');
const content = template
  .replace('$client', client) 
  .replace('$css', css)
; 
const contentType = 'text/html';

http.createServer(function (request, response) {
	response.writeHead(200, { 'Content-Type': contentType });
	response.end(content, 'utf-8');
}).listen(8125);
console.log('Server running at http://localhost:8125/');

const wss = new ws.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
  setInterval(() => {
    ws.send('something more')
  }, 5000);

});
