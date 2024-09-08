const http = require('http');
const app = require('./app');
const server = http.createServer(app);
require('dotenv').config();
const port = process.env.PORT || 3000;

server.listen(port, '0.0.0.0', () => {
  console.log('Iniciado com sucesso porta: ',port)
})