import { Tool } from './types';

class EraserTool implements Tool {
  title: string = 'eraser';
  isDrawing: boolean;

  startDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
  draw: (event: MouseEvent, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  endDraw: (event: MouseEvent, context: CanvasRenderingContext2D) => void;
}

export const eraserTool = new EraserTool();
