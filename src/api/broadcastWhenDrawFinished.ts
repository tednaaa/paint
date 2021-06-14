import { sessionState } from '../store';
import { socket } from './socket';

export const broadcastWhenDrawFinished = () => {
  socket.send(
    JSON.stringify({
      method: 'draw',
      id: sessionState.id,
      figure: {
        type: 'finish',
      },
    })
  );
};
