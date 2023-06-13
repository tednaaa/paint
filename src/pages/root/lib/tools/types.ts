export interface Tool {
  title: string;
  isDrawing: boolean;

  startDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
  draw: (event: MouseEvent, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  endDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
}
