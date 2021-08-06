import { socket } from '..';
import { sessionState } from '../../../store';

export const emitConnectToRoom = () => {
  socket.emit('connectToRoom', sessionState.id);
};
