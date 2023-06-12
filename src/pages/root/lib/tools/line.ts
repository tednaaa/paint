import { Tool } from './types';

class LineTool implements Tool {
  title: string = 'line';
  isDrawing: boolean;

  startDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
  draw: (event: MouseEvent, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  endDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
}

export const lineTool = new LineTool();
