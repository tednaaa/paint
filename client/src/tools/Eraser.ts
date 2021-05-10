import { Tool } from '.';

export class Eraser extends Tool {
  mouseDown = false;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
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
          type: 'finish',
        },
      })
    );
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
        this.socket.send(
          JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
              type: 'eraser',
              x: event.touches[0].pageX - target.offsetLeft,
              y: event.touches[0].pageY - target.offsetTop,
              lineWidth: this.ctx.lineWidth,
            },
          })
        );
      } else {
        this.socket.send(
          JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
              type: 'eraser',
              x: event.pageX - target.offsetLeft,
              y: event.pageY - target.offsetTop,
              lineWidth: this.ctx.lineWidth,
            },
          })
        );
      }
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
