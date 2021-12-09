import { Tool } from './tool';

export class Circle extends Tool {
  isDrawing: boolean = false;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  width: number;
  height: number;
  saved = null;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.listen();
  }

  startDraw(event: MouseEvent) {
    this.isDrawing = true;

    this.startX = event.clientX;
    this.startY = event.clientY - this.canvas.offsetTop;

    this.saved = this.canvas.toDataURL();
  }

  draw(event: MouseEvent) {
    if (this.isDrawing) {
      const currentX = event.clientX;
      const currentY = event.clientY;
      const width = currentX - this.startX;
      const height = currentY - this.startY - this.canvas.offsetTop;
      const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
      const image = new Image();

      image.src = this.saved;

      image.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
        this.ctx.fill();
      };
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
