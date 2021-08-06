import { IMessage } from '../../interfaces';
import { canvasState } from '../../store';
import { Brush, Circle, Eraser, Line, Rectangle } from '../../tools';

export const handleDrawInCanvas = (message: IMessage) => {
  const figure = message.figure;
  const ctx = canvasState.canvas.getContext('2d');

  if (ctx) {
    switch (figure.type) {
      case 'brush':
        Brush.drawFromBroadcast(
          ctx,
          figure.x,
          figure.y,
          figure.color,
          figure.lineWidth
        );
        break;
      case 'rectangle':
        Rectangle.drawFromBroadcast(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        );
        break;
      case 'circle':
        Circle.drawFromBroadcast(
          ctx,
          figure.x,
          figure.y,
          figure.radius,
          figure.color
        );
        break;
      case 'eraser':
        Eraser.drawFromBroadcast(ctx, figure.x, figure.y, figure.lineWidth);
        break;
      case 'line':
        Line.drawFromBroadcast(
          ctx,
          figure.x,
          figure.y,
          figure.currentX,
          figure.currentY,
          figure.color,
          figure.lineWidth
        );
        break;
      default:
        ctx.beginPath();
        break;
    }
  }
};
