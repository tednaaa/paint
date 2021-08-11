import { emitMessage } from '../api';
import { IDrawBrushFromBroadcast } from '../interfaces';
import { Tool } from './Tool';

export class Brush extends Tool {
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

    this.ctx.beginPath();
  }

  handleMouseDown(event: MouseEvent | TouchEvent) {
    const target = event.target as HTMLCanvasElement;

    this.mouseDown = true;
    this.ctx.beginPath();

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

      const drawInfo = {
        x: this.x,
        y: this.y,
        lineWidth: this.lineWidth,
        color: this.strokeColor,
      };

      emitMessage({
        ctx: this.ctx,
        figure: {
          type: 'brush',
          ...drawInfo,
        },
      });

      Brush.draw({
        ctx: this.ctx,
        ...drawInfo,
      });
    }
  }

  static draw({ ctx, x, y, color, lineWidth }: IDrawBrushFromBroadcast) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
