import { sessionState } from '../store';
import { socket } from './socket';

export const handleConnectUser = (username: string) => {
  socket.send(
    JSON.stringify({
      method: 'connect',
      id: sessionState.id,
      username: username,
    })
  );
};
