const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('node-uuid');
const PORT = 4000;
const server = express().use(express.static('public')).listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));
const wss = new SocketServer({server});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.broadcast({type: "counter", counter: wss.clients.length})

  ws.on('message', function(event) {
    let parseMessage = JSON.parse(event);
    let newParsed;

    if (parseMessage.data.messages.type === "postNotification") {
      newParsed = {
        type: "incomingNotification",
        id: uuidV4(),
        username: parseMessage.data.messages.username,
        content: parseMessage.data.messages.content
      }
    }

    if (parseMessage.data.messages.type === "postMessage") {
      newParsed = {
        type: "incomingMessage",
        id: uuidV4(),
        username: parseMessage.data.messages.username,
        content: parseMessage.data.messages.content
      };
    }

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(newParsed));
    });

  });

  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast({type: "counter", counter: wss.clients.length})
  });
})
