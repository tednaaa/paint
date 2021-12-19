import { canvasSocket } from '@/shared/api';
import { $color } from '@/entities/color-picker';
import { $lineWidth } from '@/features/set-line-width';
import { Tool } from './tool';

export class Line extends Tool {
  isDrawing: boolean = false;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  saved = null;

  constructor(room: string, canvas: HTMLCanvasElement) {
    super(room, canvas);

    this.listen();
  }

  startDraw(event: MouseEvent) {
    this.isDrawing = true;

    this.startX = event.clientX;
    this.startY = event.clientY - this.canvas.offsetTop;

    this.ctx.lineWidth = $lineWidth.getState();
    this.ctx.strokeStyle = $color.getState();

    this.ctx.moveTo(this.startX, this.startY);
    this.saved = this.canvas.toDataURL();

    this.ctx.beginPath();
  }

  draw(event: MouseEvent) {
    if (this.isDrawing) {
      const image = new Image();

      this.currentX = event.clientX;
      this.currentY = event.clientY - this.canvas.offsetTop;

      image.src = this.saved;

      image.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(this.currentX, this.currentY);
        this.ctx.stroke();
      };
    }
  }

  endDraw() {
    if (this.isDrawing) {
      this.isDrawing = false;

      this.ctx.beginPath();
      this.emitDrawEnd();
      this.emitCoordinatesToConnectedUsers(this.startX, this.startY, this.currentX, this.currentY);
    }
  }

  emitCoordinatesToConnectedUsers(startX: number, startY: number, currentX: number, currentY: number) {
    canvasSocket.emit('draw', {
      room: this.currentRoom,
      toolName: 'line',
      color: this.ctx.strokeStyle,
      coordinates: { startX, startY, currentX, currentY },
    });
  }

  listen() {
    this.canvas.onmousedown = this.startDraw.bind(this);
    this.canvas.onmousemove = this.draw.bind(this);
    this.canvas.onmouseup = this.endDraw.bind(this);
    this.canvas.onmouseout = this.endDraw.bind(this);
  }
}
