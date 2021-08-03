import { socket } from '..';
import { sessionState } from '../../../store';

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
