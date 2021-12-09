import { setTool } from '../model/tool.model';
import { Brush } from './tools/brush';
import { Circle } from './tools/circle';
import { Eraser } from './tools/eraser';
import { Line } from './tools/line';
import { Rectangle } from './tools/rectangle';

interface IHandleToolSelect {
  title: string;
  canvas: HTMLCanvasElement;
}

export const handleToolSelect = ({ title, canvas }: IHandleToolSelect) => {
  switch (title) {
    case 'brush':
      return setTool(new Brush(canvas));
    case 'rectangle':
      return setTool(new Rectangle(canvas));
    case 'circle':
      return setTool(new Circle(canvas));
    case 'eraser':
      return setTool(new Eraser(canvas));
    case 'line':
      return setTool(new Line(canvas));
  }
};
