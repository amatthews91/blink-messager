const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });

console.log(`WebSocket server listening on port ${process.env.PORT}`);

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  })
  ws.send('Message received successfully.');
});
