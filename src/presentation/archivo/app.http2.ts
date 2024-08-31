import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
},(req, res) => {
  console.log(req.url);

  // res.writeHead(200, { 'ContentType': 'text/html'});
  // res.write('<h1>Hola Mundo!!!</h1>')
  // res.end();

  // const data = {name: 'John Doe', age: 30, city: 'New York'};
  // res.writeHead(200, { 'ContentType': 'application/json'});
  // res.end(JSON.stringify(data));

  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf8');
    res.writeHead(200, { 'ContentType': 'text/html'});
    res.end(htmlFile);
  } else {
    res.writeHead(404, { 'ContentType': 'text/html'});
    res.end();
 
  };



});

server.listen(8080, () => {
  console.log('Server escuchando en puerto 8080...');
});