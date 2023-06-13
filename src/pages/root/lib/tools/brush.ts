import { $color, $lineWidth } from '../../model';

import { Tool } from './tool';

class BrushTool extends Tool {
  title: string = 'brush';
  isDrawing: boolean = false;

  startDraw() {
    this.isDrawing = true;

    this.context.lineWidth = parseInt($lineWidth.getState());
    this.context.strokeStyle = $color.getState();
    this.context.beginPath();
  }

  draw(event: MouseEvent | TouchEvent) {
    if (this.isDrawing) {
      const isTouch = event instanceof TouchEvent;

      const clientX = isTouch ? event.touches[0].clientX : event.clientX;
      const clientY = (isTouch ? event.touches[0].clientY : event.clientY) - this.canvas.offsetTop;

      this.context.lineTo(clientX, clientY);
      this.context.stroke();
    }
  }
}

export const brushTool = new BrushTool();
