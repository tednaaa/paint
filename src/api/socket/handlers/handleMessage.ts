import { handleDrawInCanvas } from '../../../utils';
import { socket } from '..';
import { IMessage } from '../../../interfaces';

export const handleMessage = () => {
  socket.on('message', (message: IMessage) => {
    handleDrawInCanvas(message);
  });
};
