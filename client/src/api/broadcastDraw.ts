import { BroadcastDraw } from '../interfaces';
import { sessionState } from '../store';
import { socket } from './socket';

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
  socket.send(
    JSON.stringify({
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
    })
  );
};
