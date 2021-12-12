import { canvasSocket } from '@/shared/api';

export interface ITool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  currentRoom: string;

  set color(newColor: string);
  set lineWidth(newLineWidth: number);
}

export class Tool implements ITool {
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  currentRoom: string;

  set color(newColor: string) {
    this.ctx.strokeStyle = newColor;
    this.ctx.fillStyle = newColor;
  }

  set lineWidth(newLineWidth: number) {
    this.ctx.lineWidth = newLineWidth;
  }

  constructor(room: string, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.currentRoom = room;
    this.ctx = this.canvas.getContext('2d');

    this.destroyEvents();
    this.handleEmittedDrawEnded();
  }

  destroyEvents() {
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
    this.canvas.onmouseout = null;
  }

  emitDrawEnd() {
    canvasSocket.emit('drawEnd', this.currentRoom);
  }

  handleEmittedDrawEnded() {
    canvasSocket.on('drawEnded', () => this.ctx.beginPath());
  }
}
