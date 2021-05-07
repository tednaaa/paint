export interface ParsedMessage {
  method: 'connect' | 'draw';
  id: string;
  username: string;
  figure: {
    type: 'brush' | 'rect' | 'finish';
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  };
}
