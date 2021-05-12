export interface ParsedMessage {
  method: 'connect' | 'draw';
  id: string;
  username: string;
  figure: {
    type: 'brush' | 'rect' | 'circle' | 'eraser' | 'line' | 'finish';
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
