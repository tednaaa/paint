import { broadcastDraw, broadcastWhenDrawFinished } from '../api';
import { Tool } from './Tool';

export class Eraser extends Tool {
  mouseDown = false;
  x: number = 0;
  y: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.handleMouseUp.bind(this);
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMouseMove.bind(this);

    this.canvas.ontouchend = this.handleMouseUp.bind(this);
    this.canvas.ontouchstart = this.handleMouseDown.bind(this);
    this.canvas.ontouchmove = this.handleMouseMove.bind(this);
  }

  handleMouseUp() {
    this.mouseDown = false;
  }

  handleMouseDown(event: MouseEvent | TouchEvent) {
    const target = event.target as HTMLCanvasElement;

    this.mouseDown = true;
    this.ctx.beginPath();

    broadcastWhenDrawFinished();

    if (event instanceof TouchEvent) {
      this.ctx.moveTo(
        event.touches[0].pageX - target.offsetLeft,
        event.touches[0].pageY - target.offsetTop
      );
    } else {
      this.ctx.moveTo(
        event.pageX - target.offsetLeft,
        event.pageY - target.offsetTop
      );
    }
  }

  handleMouseMove(event: MouseEvent | TouchEvent) {
    const target = event.target as HTMLCanvasElement;

    event.preventDefault();

    if (this.mouseDown) {
      if (event instanceof TouchEvent) {
        this.x = event.touches[0].pageX - target.offsetLeft;
        this.y = event.touches[0].pageY - target.offsetTop;
      } else {
        this.x = event.pageX - target.offsetLeft;
        this.y = event.pageY - target.offsetTop;
      }

      broadcastDraw({
        figureType: 'eraser',
        ctx: this.ctx,
        x: this.x,
        y: this.y,
      });
    }
  }

  static draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    lineWidth: number
  ) {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = lineWidth;

    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
