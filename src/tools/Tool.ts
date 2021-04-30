export class Tool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas!;
    this.ctx = canvas?.getContext('2d')!;

    this.destroyEvents();
  }

  set fillColor(color: string) {
    this.ctx.fillStyle = color;
  }

  set strokeColor(color: string) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
  }

  destroyEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;

    this.canvas.ontouchend = null;
    this.canvas.ontouchstart = null;
    this.canvas.ontouchmove = null;
  }
}
