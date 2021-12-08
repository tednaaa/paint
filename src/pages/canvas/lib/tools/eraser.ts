import { Tool } from './tool';

export class Eraser extends Tool {
  isDrawing: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.listen();
  }

  startDraw() {
    this.isDrawing = true;
    this.ctx.strokeStyle = '#fff';
  }

  draw(event: MouseEvent) {
    if (this.isDrawing) {
      this.ctx.lineTo(event.clientX, event.clientY - this.canvas.offsetTop);
      this.ctx.stroke();
    }
  }

  endDraw() {
    this.isDrawing = false;

    this.ctx.beginPath();
  }

  listen() {
    this.canvas.onmousedown = this.startDraw.bind(this);
    this.canvas.onmousemove = this.draw.bind(this);
    this.canvas.onmouseup = this.endDraw.bind(this);
    this.canvas.onmouseout = this.endDraw.bind(this);

    this.canvas.ontouchstart = this.startDraw.bind(this);
    this.canvas.ontouchmove = this.draw.bind(this);
    this.canvas.ontouchend = this.endDraw.bind(this);
  }
}
