import { IColor } from '../../types';

export interface IDrawLineFromBroadcast {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  currentX: number;
  currentY: number;
  color: IColor;
  lineWidth: number;
}
