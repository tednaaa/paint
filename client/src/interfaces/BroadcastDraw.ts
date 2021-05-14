import { FigureType } from '../types';

export interface BroadcastDraw {
  figureType: FigureType;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  currentX?: number;
  currentY?: number;
  width?: number;
  height?: number;
  radius?: number;
}
