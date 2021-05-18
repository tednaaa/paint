import { Figure, Method } from '../types';

export interface ParsedMessage {
  method: Method;
  id: string;
  figure: {
    type: Figure;
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
