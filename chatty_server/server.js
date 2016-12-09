// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let count = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  console.log("broadcast:",data);
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  count++;
  console.log("users:", count);

  // wss.broadcast({
  //   data: {
  //     counter: count
  //   }
  // })

  ws.on('message', function (event) {
    let parseMessage = JSON.parse(event);
    console.log("event:", parseMessage);
    let msg = "incomingMessage";
    let newParsed = {
      type: msg,
      id: uuidV4(),
      username: parseMessage.username,
      content: parseMessage.content
    };
    console.log("parsed:", newParsed);
    // console.log("ID:", uuidV4());
    // console.log('User:', parseMessage.username)
    // console.log('Message:', parseMessage.content) //JSON parse

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(newParsed));
    });

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    count--;
    console.log("users:", count);
  });
})
