// import http from 'http';
// import app from './app';

const http = require('http');
const app = require('./app')

const PORT = 8010;

const server = http.createServer(app);

server.listen(
    PORT,
    () => console.log(`We're alive on port ${PORT}!`)
);