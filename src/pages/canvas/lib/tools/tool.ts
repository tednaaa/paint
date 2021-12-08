export interface ITool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  set color(newColor: string);
  set lineWidth(newLineWidth: number);
}

export class Tool implements ITool {
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;

  set color(newColor: string) {
    this.ctx.strokeStyle = newColor;
    this.ctx.fillStyle = newColor;
  }

  set lineWidth(newLineWidth: number) {
    this.ctx.lineWidth = newLineWidth;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.destroyEvents();
  }

  destroyEvents() {
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
    this.canvas.onmouseout = null;

    this.canvas.ontouchstart = null;
    this.canvas.ontouchmove = null;
    this.canvas.ontouchend = null;
  }
}
