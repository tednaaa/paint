import { socket } from '..';
import { sessionState } from '../../../store';

export const handleConnect = () => {
  socket.emit('hello', sessionState.id);
};
