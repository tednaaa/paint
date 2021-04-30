import { Brush } from './Brush';

export class Eraser extends Brush {
  draw(x: number, y: number) {
    this.ctx.strokeStyle = '#fff';

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
