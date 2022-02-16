import { $color } from '@/entities/color-picker';
import { canvasSocket } from '@/shared/api';
import { Tool } from './tool';

export class Rectangle extends Tool {
  isDrawing = false;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  width: number;
  height: number;
  saved = null;

  constructor(room: string, canvas: HTMLCanvasElement) {
    super(room, canvas);

    this.listen();
  }

  startDraw(event: MouseEvent) {
    this.isDrawing = true;

    this.startX = event.clientX;
    this.startY = event.clientY - this.canvas.offsetTop;

    this.ctx.fillStyle = $color.getState();
    this.saved = this.canvas.toDataURL();

    this.ctx.beginPath();
  }

  draw(event: MouseEvent) {
    if (this.isDrawing) {
      const currentX = event.clientX;
      const currentY = event.clientY;
      const image = new Image();

      this.width = currentX - this.startX;
      this.height = currentY - this.startY - this.canvas.offsetTop;

      image.src = this.saved;

      image.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.rect(this.startX, this.startY, this.width, this.height);
        this.ctx.fill();
      };
    }
  }

  endDraw() {
    if (this.isDrawing) {
      this.isDrawing = false;

      this.ctx.beginPath();
      this.emitCoordinatesToConnectedUsers(this.startX, this.startY, this.width, this.height);
      this.emitDrawEnd();
    }
  }

  emitCoordinatesToConnectedUsers(currentX: number, currentY: number, width: number, height: number) {
    canvasSocket.emit('draw', {
      room: this.currentRoom,
      toolName: 'rectangle',
      color: this.ctx.fillStyle,
      coordinates: { currentX, currentY, width, height },
    });
  }

  listen() {
    this.canvas.onmousedown = this.startDraw.bind(this);
    this.canvas.onmousemove = this.draw.bind(this);
    this.canvas.onmouseup = this.endDraw.bind(this);
    this.canvas.onmouseout = this.endDraw.bind(this);
  }
}
