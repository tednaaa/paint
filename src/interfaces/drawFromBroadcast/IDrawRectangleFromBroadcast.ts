import { IColor } from '../../types';

export interface IDrawRectangleFromBroadcast {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  color: IColor;
}
