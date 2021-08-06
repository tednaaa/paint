import { IColor } from '../../types';

export interface ILine {
  type: 'line';
  x: number;
  y: number;
  currentX: number;
  currentY: number;
  color: IColor;
  lineWidth: number;
}
