import { canvasSocket } from '@/shared/api';
import { $color } from '@/entities/color-picker';
import { Tool } from './tool';

export class Brush extends Tool {
  isDrawing: boolean = false;

  constructor(room: string, canvas: HTMLCanvasElement) {
    super(room, canvas);

    this.listen();
  }

  startDraw() {
    this.isDrawing = true;

    this.ctx.strokeStyle = $color.getState();
    this.ctx.beginPath();
  }

  draw(event: MouseEvent) {
    if (this.isDrawing) {
      const currentX = event.clientX;
      const currentY = event.clientY - this.canvas.offsetTop;

      this.ctx.lineTo(currentX, currentY);
      this.ctx.stroke();
      this.emitCoordinatesToConnectedUsers(currentX, currentY);
    }
  }

  endDraw() {
    if (this.isDrawing) {
      this.isDrawing = false;

      this.ctx.beginPath();
      this.emitDrawEnd();
    }
  }

  emitCoordinatesToConnectedUsers(currentX: number, currentY: number) {
    canvasSocket.emit('draw', {
      room: this.currentRoom,
      toolName: 'brush',
      color: this.ctx.strokeStyle,
      lineWidth: this.ctx.lineWidth,
      coordinates: { currentX, currentY },
    });
  }

  listen() {
    this.canvas.onmousedown = this.startDraw.bind(this);
    this.canvas.onmousemove = this.draw.bind(this);
    this.canvas.onmouseup = this.endDraw.bind(this);
    this.canvas.onmouseout = this.endDraw.bind(this);
  }
}
