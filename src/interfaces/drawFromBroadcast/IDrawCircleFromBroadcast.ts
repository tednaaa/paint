import { IColor } from '../../types';

export interface IDrawCircleFromBroadcast {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color: IColor;
}
