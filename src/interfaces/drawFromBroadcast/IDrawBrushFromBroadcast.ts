import { IColor } from '../../types';

export interface IDrawBrushFromBroadcast {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: IColor;
  lineWidth: number;
}
