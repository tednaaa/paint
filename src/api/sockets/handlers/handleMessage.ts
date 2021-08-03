import { ParsedMessage } from '../../../interfaces';
import { handleDrawInCanvas } from '../../../utils';
import { socket } from '..';

export const handleMessage = () => {
  socket.on('message', (message: MessageEvent) => {
    const parsedMessage: ParsedMessage = JSON.parse(message.data);

    switch (parsedMessage.method) {
      case 'draw':
        handleDrawInCanvas(parsedMessage);
        break;
    }
  });
};
