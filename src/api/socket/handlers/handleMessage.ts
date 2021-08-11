import { IMessage } from '../../../interfaces';
import { canvasState } from '../../../store';
import { Brush, Circle, Eraser, Line, Rectangle } from '../../../tools';

export const handleMessage = (message: IMessage) => {
  const figure = message.figure;
  const ctx = canvasState.canvas.getContext('2d');

  if (ctx) {
    switch (figure.type) {
      case 'brush':
        Brush.draw({
          ctx,
          x: figure.x,
          y: figure.y,
          color: figure.color,
          lineWidth: figure.lineWidth,
        });
        break;
      case 'rectangle':
        Rectangle.drawFromBroadcast({
          ctx,
          x: figure.x,
          y: figure.y,
          color: figure.color,
          width: figure.width,
          height: figure.height,
        });
        break;
      case 'circle':
        Circle.drawForOtherClients({
          ctx,
          x: figure.x,
          y: figure.y,
          color: figure.color,
          radius: figure.radius,
        });
        break;
      case 'eraser':
        Eraser.drawFromBroadcast({
          ctx,
          x: figure.x,
          y: figure.y,
          lineWidth: figure.lineWidth,
        });
        break;
      case 'line':
        Line.drawFromBroadcast({
          ctx,
          x: figure.x,
          y: figure.y,
          currentX: figure.currentX,
          currentY: figure.currentY,
          color: figure.color,
          lineWidth: figure.lineWidth,
        });
        break;
      default:
        ctx.beginPath();
        break;
    }
  }
};
