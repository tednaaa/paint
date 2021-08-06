import { IColor } from '../../types';

export interface ICircle {
  type: 'circle';
  x: number;
  y: number;
  radius: number;
  color: IColor;
}
