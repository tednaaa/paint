import { IColor } from '../../types';

export interface IRectangle {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  color: IColor;
}
