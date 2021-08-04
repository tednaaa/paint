import { socket } from '..';
import { sessionState } from '../../../store';

export const broadcastWhenDrawFinished = () => {
  socket.emit('message', {
    method: 'draw',
    id: sessionState.id,
    figure: {
      type: 'finish',
    },
  });
};
