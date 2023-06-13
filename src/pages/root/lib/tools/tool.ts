export class Tool {
  title: string;
  isDrawing: boolean;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  setup(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  startDraw(event: MouseEvent | TouchEvent) {
    throw new Error('Implement startDraw method');
  }

  draw(event: MouseEvent | TouchEvent) {
    throw new Error(`Implement draw method`);
  }

  endDraw() {
    if (this.isDrawing) {
      this.isDrawing = false;

      this.context.beginPath();
    }
  }
}
