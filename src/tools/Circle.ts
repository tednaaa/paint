import { emitMessage } from '../api';
import { IDrawCircleFromBroadcast } from '../interfaces';
import { Tool } from './Tool';

export class Circle extends Tool {
  mouseDown = false;
  startX: number = 0;
  startY: number = 0;
  radius: number = 0;
  saved: string = '';
  color: string = '';

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

    emitMessage({
      ctx: this.ctx,
      figure: {
        type: 'circle',
        x: this.startX,
        y: this.startY,
        radius: this.radius,
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

        const width = currentX - this.startX;
        const height = currentY - this.startY;

        this.radius = Math.sqrt(width ** 2 + height ** 2);
      } else {
        const currentX = event.pageX - target.offsetLeft;
        const currentY = event.pageY - target.offsetTop;

        const width = currentX - this.startX;
        const height = currentY - this.startY;

        this.radius = Math.sqrt(width ** 2 + height ** 2);
      }

      this.draw(this.startX, this.startY, this.radius);
    }
  }

  draw(x: number, y: number, radius: number) {
    const image = new Image();

    image.src = this.saved;
    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    };
  }

  static drawFromBroadcast({
    ctx,
    x,
    y,
    radius,
    color,
  }: IDrawCircleFromBroadcast) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
