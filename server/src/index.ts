import cors from 'cors';
import path from 'path';
import { router } from './router';
import { ParsedMessage } from './interfaces';
import { API_URL, handleConnection, broadcastConnection } from './utils';

const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.resolve(__dirname, '..', '..', 'client', 'build')));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use('/', router);

app.ws('/', (webSocket: any) => {
  webSocket.on('message', (message: string) => {
    const parsedMessage: ParsedMessage = JSON.parse(message);

    switch (parsedMessage.method) {
      case 'connect':
        handleConnection(webSocket, aWss, parsedMessage);
        break;
      case 'draw':
        broadcastConnection(aWss, parsedMessage);
        break;
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on: ${API_URL}`);
});
