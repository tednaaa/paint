import { sessionState } from '../store';
import { socket } from './sockets';

export const broadcastWhenDrawFinished = () => {
  socket.emit(
    'message',
    JSON.stringify({
      method: 'draw',
      id: sessionState.id,
      figure: {
        type: 'finish',
      },
    })
  );
};
