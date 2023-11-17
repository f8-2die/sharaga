// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.type === 'text') {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'text',
              content: parsedMessage.content,
              nickname: parsedMessage.nickname, // Передаем nickname в сообщении
            }));
          }
        });
      } else if (parsedMessage.type === 'image') {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'image',
              content: parsedMessage.content,
              nickname: parsedMessage.nickname, // Передаем nickname в сообщении
            }));
          }
        });
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
});

