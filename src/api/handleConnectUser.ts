import { sessionState } from '../store';
import { socket } from './sockets';

export const handleConnectUser = () => {
  socket.emit(
    'connect',
    JSON.stringify({
      method: 'connect',
      id: sessionState.id,
    })
  );
};
