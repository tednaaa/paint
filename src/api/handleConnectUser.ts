import { sessionState } from '../store';
import { socket } from './socket';

export const handleConnectUser = () => {
  socket.send(
    JSON.stringify({
      method: 'connect',
      id: sessionState.id,
    })
  );
};
