import { $color } from '../../model';
import { Tool } from './tool';

class CircleTool extends Tool {
  title: string = 'circle';
  isDrawing: boolean;

  startX: number;
  startY: number;
  width: number;
  height: number;
  radius: number;
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

      const width = clientX - this.startX;
      const height = clientY - this.startY - this.canvas.offsetTop;
      const image = new Image();

      this.radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

      image.src = this.saved;

      image.onload = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        this.context.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
      };
    }
  }
}

export const circleTool = new CircleTool();
