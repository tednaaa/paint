export class Tool {
  canvas = null;
  ctx = null;

  constructor(canvas: any) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.destroyEvents()
  }

  destroyEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
  }
}
