const http = require('http');
const app = require('./app');
const server = http.createServer(app);
require('dotenv').config();
const PORT = process.env.PORT || 1234;

server.listen(PORT, '0.0.0.0', () => {
  console.log('Iniciado com sucesso porta: ',PORT)
})