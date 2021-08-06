import { socket } from '..';
import { IMessageBroadcast } from '../../../interfaces';

export const emitMessage = (message: IMessageBroadcast) => {
  socket.emit('message', message);
};
