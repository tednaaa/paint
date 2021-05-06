import { Tool } from './Tool';

export class Rect extends Tool {
  mouseDown = false;
  startX: number = 0;
  startY: number = 0;
  width: number = 0;
  height: number = 0;
  color: string = '';
  saved: string = '';

  constructor(canvas: HTMLCanvasElement, socket: any, id: string) {
    super(canvas, socket, id);

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

    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'rect',
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          color: this.ctx.fillStyle,
        },
      })
    );
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
        let currentX = event.touches[0].pageX - target.offsetLeft;
        let currentY = event.touches[0].pageY - target.offsetTop;
        this.width = currentX - this.startX;
        this.height = currentY - this.startY;

        this.draw(this.startX, this.startY, this.width, this.height);
      } else {
        let currentX = event.pageX - target.offsetLeft;
        let currentY = event.pageY - target.offsetTop;
        this.width = currentX - this.startX;
        this.height = currentY - this.startY;

        this.draw(this.startX, this.startY, this.width, this.height);
      }
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

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();
  }
}
