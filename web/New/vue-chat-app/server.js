const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));

const connections = new Set();

wss.on('connection', (ws) => {
  connections.add(ws);
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      console.log('Received message:', message);
      const data = JSON.parse(message);
      if (data.type === 'text') {
        // Рассылать текстовые сообщения всем подключенным клиентам
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      } else if (data.type === 'image') {
        // Сохранить изображение и рассылать его всем подключенным клиентам
        saveImage(data.image);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  ws.on('close', () => {
    connections.delete(ws);
    console.log('Client disconnected');
  });
});


function saveImage(base64String) {
  // Сохранение изображения
  const imageName = `image_${Date.now()}.png`;
  fs.writeFile(imageName, base64String, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
    } else {
      console.log('Image saved:', imageName);
    }
  });
}

server.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});