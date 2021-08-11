import { emitMessage } from '../api';
import { IDrawRectangleFromBroadcast } from '../interfaces';
import { Tool } from './Tool';

export class Rectangle extends Tool {
  mouseDown = false;
  startX: number = 0;
  startY: number = 0;
  width: number = 0;
  height: number = 0;
  saved: string = '';

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

    emitMessage({
      ctx: this.ctx,
      figure: {
        type: 'rectangle',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
        color: this.strokeColor,
      },
    });
  }

  handleMouseDown(event: MouseEvent | TouchEvent) {
    const target = event.target as HTMLCanvasElement;

    if (event instanceof TouchEvent) {
      this.startX = event.touches[0].pageX - target.offsetLeft;
      this.startY = event.touches[0].pageY - target.offsetTop;
    } else {
      this.startX = event.pageX - target.offsetLeft;
      this.startY = event.pageY - target.offsetTop;
    }

    this.saved = this.canvas.toDataURL();
    this.mouseDown = true;

    this.ctx.beginPath();
  }

  handleMouseMove(event: MouseEvent | TouchEvent) {
    const target = event.target as HTMLCanvasElement;

    event.preventDefault();

    if (this.mouseDown) {
      if (event instanceof TouchEvent) {
        const currentX = event.touches[0].pageX - target.offsetLeft;
        const currentY = event.touches[0].pageY - target.offsetTop;

        this.width = currentX - this.startX;
        this.height = currentY - this.startY;
      } else {
        const currentX = event.pageX - target.offsetLeft;
        const currentY = event.pageY - target.offsetTop;

        this.width = currentX - this.startX;
        this.height = currentY - this.startY;
      }

      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x: number, y: number, width: number, height: number) {
    const image = new Image();

    image.src = this.saved;
    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.fill();
    };
  }

  static drawFromBroadcast({
    ctx,
    x,
    y,
    width,
    height,
    color,
  }: IDrawRectangleFromBroadcast) {
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.beginPath();
  }
}
