import { IColor } from '../../types';

export interface IBrush {
  type: 'brush';
  x: number;
  y: number;
  color: IColor;
  lineWidth: number;
}
