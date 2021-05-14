import { ParsedMessage } from '../interfaces';
import { canvasState } from '../store';
import { Brush, Circle, Eraser, Line, Rect } from '../tools';

export const handleDrawInCanvas = (message: ParsedMessage) => {
  const figure = message.figure;
  const ctx = canvasState.canvas.getContext('2d');

  if (ctx) {
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y, figure.color, figure.lineWidth);
        break;
      case 'rect':
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        );
        break;
      case 'circle':
        Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.color);
        break;
      case 'eraser':
        Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth);
        break;
      case 'line':
        Line.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.currentX,
          figure.currentY,
          figure.color,
          figure.lineWidth
        );
        break;
      case 'finish':
        ctx.beginPath();
        break;
    }
  }
};
