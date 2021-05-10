export interface ParsedMessage {
  method: 'connect' | 'draw';
  id: string;
  username: string;
  figure: {
    type: 'brush' | 'rect' | 'circle' | 'eraser' | 'finish';
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
    lineWidth: number;
    color: string;
  };
}
