require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();

app.use(cors());
app.use(express.json());

const { HOST, PORT } = process.env;

app.ws('/', (webSocket: any, request: any) => {
  webSocket.on('message', (message: any) => {
    message = JSON.parse(message);

    switch (message.method) {
      case 'connect':
        handleConnection(webSocket, message);
        break;
      case 'draw':
        broadcastConnection(webSocket, message);
        break;
    }
  });
});

const handleConnection = (webSocket: any, message: any) => {
  webSocket.id = message.id;

  broadcastConnection(webSocket, message);
};

const broadcastConnection = (webSocket: any, message: any) => {
  aWss.clients.forEach((client: any) => {
    if (client.id === message.id) {
      client.send(JSON.stringify(message));
    }
  });
};

app.post('/image', (request: any, response: any) => {
  try {
    const data = request.body.image.replace('data:image/png;base64,', '');

    fs.writeFileSync(
      path.resolve(__dirname, 'images', `${Object.keys(request.query)[0]}.jpg`),
      data,
      'base64'
    );

    return response.status(200).json({ message: 'loaded' });
  } catch (error) {
    console.log(error);

    return response.status(500).json('error');
  }
});
app.get('/image', (request: any, response: any) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, 'images', `${Object.keys(request.query)[0]}.jpg`)
    );
    const data = `data:image/png;base64,${file.toString('base64')}`;

    return response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json('error');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on: https://${HOST}:${PORT}`);
});
