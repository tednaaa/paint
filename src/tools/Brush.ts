import { Tool } from './Tool';

export class Brush extends Tool {
  mouseDown = false;

  constructor(canvas: any) {
    super(canvas);

    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.handleMouseUp.bind(this);
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMouseMove.bind(this);
  }

  handleMouseUp(event: React.MouseEvent<HTMLCanvasElement>) {
    this.mouseDown = false;
  }

  handleMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      event.pageX - event.currentTarget.offsetLeft,
      event.pageY - event.currentTarget.offsetTop
    );
  }

  handleMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (this.mouseDown) {
      this.draw(
        event.pageX - event.currentTarget.offsetLeft,
        event.pageY - event.currentTarget.offsetTop
      );
    }
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    console.log('Draws! hopefully');
  }
}
