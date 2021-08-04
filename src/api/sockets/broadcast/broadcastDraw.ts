import { BroadcastDraw } from '../../../interfaces';
import { sessionState } from '../../../store';
import { socket } from '..';

export const broadcastDraw = ({
  figureType,
  ctx,
  x,
  y,
  currentX,
  currentY,
  radius,
  width,
  height,
}: BroadcastDraw) => {
  socket.emit('message', {
    method: 'draw',
    id: sessionState.id,
    figure: {
      type: figureType,
      x,
      y,
      currentX,
      currentY,
      radius,
      width,
      height,
      color: ctx.strokeStyle,
      lineWidth: ctx.lineWidth,
    },
  });
};
