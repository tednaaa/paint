require('dotenv').config();

const express = require('express');

const app = express();

const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();

const { HOST, PORT } = process.env;

app.ws('/', (ws: any, req: any) => {
  ws.on('message', (msg: any) => {
    msg = JSON.parse(msg);

    switch (msg.method) {
      case 'connect':
        handleConnection(ws, msg);
        break;
      case 'message':
        handleConnection(ws, msg);
        break;
    }
  });
});

const handleConnection = (ws: any, msg: any) => {
  ws.id = msg.id;

  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws: any, msg: any) => {
  aWss.clients.forEach((client: any) => {
    if (client.id === msg.id) {
      client.send(`Пользователь ${msg.username} подключился`);
    }
  });
};

app.listen(PORT, () => {
  console.log(`Server started on: https://${HOST}:${PORT}`);
});
