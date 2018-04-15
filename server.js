'use strict';
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const publicPath = path.join(__dirname, 'dist');
app.use(express.static(publicPath));

app.get('/', (req, res) => res.sendFile(publicPath + '/index.html'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {    
    wss.clients.forEach(c => {
      c.send(message);
    });
  });
});

const port = process.env.PORT || 3000
server.listen(port, function listening() {
  console.log(`Node.js listening on port ${port}...`);
});