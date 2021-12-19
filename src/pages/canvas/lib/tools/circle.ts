import { canvasSocket } from '@/shared/api';
import { Tool } from './tool';

export class Circle extends Tool {
  isDrawing: boolean = false;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  width: number;
  height: number;
  radius: number;
  saved = null;

  constructor(room: string, canvas: HTMLCanvasElement) {
    super(room, canvas);

    this.listen();
  }

  startDraw(event: MouseEvent) {
    this.isDrawing = true;

    this.startX = event.clientX;
    this.startY = event.clientY - this.canvas.offsetTop;

    this.saved = this.canvas.toDataURL();

    this.ctx.beginPath();
  }

  draw(event: MouseEvent) {
    if (this.isDrawing) {
      const currentX = event.clientX;
      const currentY = event.clientY;
      const width = currentX - this.startX;
      const height = currentY - this.startY - this.canvas.offsetTop;
      const image = new Image();

      this.radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

      image.src = this.saved;

      image.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
      };
    }
  }

  endDraw() {
    if (this.isDrawing) {
      this.isDrawing = false;

      this.ctx.beginPath();
      this.emitCoordinatesToConnectedUsers(this.startX, this.startY, this.radius);
      this.emitDrawEnd();
    }
  }

  emitCoordinatesToConnectedUsers(startX: number, startY: number, radius: number) {
    canvasSocket.emit('draw', {
      room: this.currentRoom,
      toolName: 'circle',
      color: this.ctx.fillStyle,
      coordinates: { startX, startY, radius },
    });
  }

  listen() {
    this.canvas.onmousedown = this.startDraw.bind(this);
    this.canvas.onmousemove = this.draw.bind(this);
    this.canvas.onmouseup = this.endDraw.bind(this);
    this.canvas.onmouseout = this.endDraw.bind(this);
  }
}
