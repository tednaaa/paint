import { FigureType, Method } from '../types';

export interface ParsedMessage {
  method: Method;
  id: string;
  username: string;
  figure: {
    type: FigureType;
    x: number;
    y: number;
    currentX: number;
    currentY: number;
    width: number;
    height: number;
    radius: number;
    lineWidth: number;
    color: string;
  };
}
