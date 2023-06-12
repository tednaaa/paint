import { Tool } from './types';

class RectangleTool implements Tool {
  title: string = 'rectangle';
  isDrawing: boolean;

  startDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
  draw: (event: MouseEvent, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  endDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
}

export const rectangleTool = new RectangleTool();
