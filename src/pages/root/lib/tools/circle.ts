import { Tool } from './types';

class CircleTool implements Tool {
  title: string = 'circle';
  isDrawing: boolean;

  startDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
  draw: (event: MouseEvent, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  endDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
}

export const circleTool = new CircleTool();
