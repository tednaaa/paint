import { ParsedMessage } from '../../../interfaces';
import { handleDrawInCanvas } from '../../../utils';
import { socket } from '..';

export const handleMessage = () => {
  socket.on('message', (message: ParsedMessage) => {
    switch (message.method) {
      case 'draw':
        handleDrawInCanvas(message);
        break;
    }
  });
};
