import { $color, $lineWidth } from '../../model';

import { Tool } from './types';

class BrushTool implements Tool {
  title: string = 'brush';
  isDrawing: boolean = false;

  startDraw(event: MouseEvent, context: CanvasRenderingContext2D) {
    this.isDrawing = true;

    context.lineWidth = parseInt($lineWidth.getState());
    context.strokeStyle = $color.getState();
    context.beginPath();
  }
  draw(event: MouseEvent, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    if (this.isDrawing) {
      const currentX = event.clientX;
      const currentY = event.clientY - canvas.offsetTop;

      context.lineTo(currentX, currentY);
      context.stroke();
    }
  }
  endDraw(event: MouseEvent, context: CanvasRenderingContext2D) {
    if (this.isDrawing) {
      this.isDrawing = false;

      context.beginPath();
    }
  }
}

export const brushTool = new BrushTool();
