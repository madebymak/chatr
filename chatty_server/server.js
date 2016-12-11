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
let userCount = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  console.log("broadcast:", data);
  wss.clients.forEach(function each(client) {
    // console.log("client:", client);
    client.send(JSON.stringify(data));
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  userCount++;
  console.log("users:", userCount);


// *** PROBLEM HERE, RUNNING ON THE SAME PORT ERROR ***
  wss.broadcast({
      type: "counter",
      counter: userCount
  })

  ws.on('message', function (event) {
    let parseMessage = JSON.parse(event);
    console.log("event:", parseMessage);
    // console.log("type:", parseMessage.data.messages.type);
    let newParsed;

    if (parseMessage.data.messages.type === "postNotification") {
      newParsed = {
          type: "incomingNotification",
          id: uuidV4(),
          username: parseMessage.data.messages.username,
          content: parseMessage.data.messages.content,
      }
    }

    if (parseMessage.data.messages.type === "postMessage"){
      newParsed = {
       type: "incomingMessage",
       id: uuidV4(),
       username: parseMessage.data.messages.username,
       content: parseMessage.data.messages.content
     };

    }
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
    userCount--;
    console.log("users:", userCount);
  });
})
