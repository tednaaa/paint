import { IColor } from '../../types';

export interface IEraser {
  type: 'eraser';
  x: number;
  y: number;
  color: IColor;
  lineWidth: number;
}
