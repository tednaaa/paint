import { ParsedMessage } from '../interfaces';
import { handleDrawInCanvas } from '../utils';
import { socket } from './sockets';

export const handleDrawUser = () => {
  socket.emit('message', (message: MessageEvent) => {
    const parsedMessage: ParsedMessage = JSON.parse(message.data);

    switch (parsedMessage.method) {
      case 'draw':
        handleDrawInCanvas(parsedMessage);
        break;
    }
  });
};
