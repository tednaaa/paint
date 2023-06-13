import { $color, $lineWidth } from '../../model';
import { Tool } from './tool';

class LineTool extends Tool {
  title: string = 'line';
  isDrawing: boolean;

  startX: number;
  startY: number;
  saved = null;

  startDraw(event: MouseEvent) {
    const isTouch = event instanceof TouchEvent;

    this.startX = isTouch ? event.touches[0].clientX : event.clientX;
    this.startY = (isTouch ? event.touches[0].clientY : event.clientY) - this.canvas.offsetTop;

    this.isDrawing = true;

    this.context.lineWidth = parseInt($lineWidth.getState());
    this.context.strokeStyle = $color.getState();

    this.context.moveTo(this.startX, this.startY);
    this.saved = this.canvas.toDataURL();

    this.context.beginPath();
  }

  draw(event: MouseEvent) {
    if (this.isDrawing) {
      const isTouch = event instanceof TouchEvent;

      const clientX = isTouch ? event.touches[0].clientX : event.clientX;
      const clientY = (isTouch ? event.touches[0].clientY : event.clientY) - this.canvas.offsetTop;

      const image = new Image();

      image.src = this.saved;

      image.onload = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        this.context.moveTo(this.startX, this.startY);
        this.context.lineTo(clientX, clientY);
        this.context.stroke();
      };
    }
  }
}

export const lineTool = new LineTool();
