import { $lineWidth } from '@/features/set-line-width';
import { canvasSocket } from '@/shared/api';
import { Tool } from './tool';

export class Eraser extends Tool {
  isDrawing = false;

  constructor(room: string, canvas: HTMLCanvasElement) {
    super(room, canvas);

    this.listen();
  }

  startDraw() {
    this.isDrawing = true;

    this.ctx.lineWidth = $lineWidth.getState();
    this.ctx.strokeStyle = '#fff';
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
      toolName: 'eraser',
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
