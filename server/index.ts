import { ParsedMessage } from './interfaces';
import { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

require('dotenv').config();

const { HOST, PORT } = process.env;

app.ws('/', (webSocket: any, request: Request) => {
  webSocket.on('message', (message: string) => {
    const parsedMessage: ParsedMessage = JSON.parse(message);

    switch (parsedMessage.method) {
      case 'connect':
        handleConnection(webSocket, parsedMessage);
        break;
      case 'draw':
        broadcastConnection(webSocket, parsedMessage);
        break;
    }
  });
});

const handleConnection = (webSocket: any, message: ParsedMessage) => {
  webSocket.id = message.id;

  broadcastConnection(webSocket, message);
};

const broadcastConnection = (webSocket: any, message: ParsedMessage) => {
  aWss.clients.forEach((client: any) => {
    if (client.id === message.id) {
      client.send(JSON.stringify(message));
    }
  });
};

app.post('/image', (request: Request, response: Response) => {
  try {
    const data = request.body.image.replace('data:image/png;base64,', '');

    console.log(data.length);

    fs.writeFileSync(
      path.resolve(__dirname, 'images', `${request.query.id}.jpg`),
      data,
      'base64'
    );

    return response.status(200).json({ message: 'loaded' });
  } catch (error) {
    console.log(error);

    return response.status(500).json('error');
  }
});
app.get('/image', (request: Request, response: Response) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, 'images', `${request.query.id}.jpg`)
    );
    const data = 'data:image/png;base64,' + file.toString('base64');

    return response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json('error');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on: https://${HOST}:${PORT}`);
});
