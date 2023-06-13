import { $color } from '../../model';
import { Tool } from './tool';

class RectangleTool extends Tool {
  title: string = 'rectangle';
  isDrawing: boolean;

  startX: number;
  startY: number;
  width: number;
  height: number;
  saved = null;

  startDraw(event: MouseEvent | TouchEvent) {
    const isTouch = event instanceof TouchEvent;

    this.startX = isTouch ? event.touches[0].clientX : event.clientX;
    this.startY = (isTouch ? event.touches[0].clientY : event.clientY) - this.canvas.offsetTop;

    this.isDrawing = true;

    this.context.fillStyle = $color.getState();
    this.saved = this.canvas.toDataURL();

    this.context.beginPath();
  }

  draw(event: MouseEvent | TouchEvent) {
    if (this.isDrawing) {
      const isTouch = event instanceof TouchEvent;

      const clientX = isTouch ? event.touches[0].clientX : event.clientX;
      const clientY = isTouch ? event.touches[0].clientY : event.clientY;

      const image = new Image();

      this.width = clientX - this.startX;
      this.height = clientY - this.startY - this.canvas.offsetTop;

      image.src = this.saved;

      image.onload = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        this.context.rect(this.startX, this.startY, this.width, this.height);
        this.context.fill();
      };
    }
  }
}

export const rectangleTool = new RectangleTool();
