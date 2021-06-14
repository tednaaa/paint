import { ParsedMessage } from '../interfaces';
import { handleDrawInCanvas } from '../utils';
import { socket } from './socket';

export const handleDrawUser = () => {
  socket.onmessage = (event: MessageEvent) => {
    const parsedMessage: ParsedMessage = JSON.parse(event.data);

    switch (parsedMessage.method) {
      case 'draw':
        handleDrawInCanvas(parsedMessage);
        break;
    }
  };
};
