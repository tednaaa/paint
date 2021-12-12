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

export const handleToolSelect = (imageId: string, { title, canvas }: IHandleToolSelect) => {
  switch (title) {
    case 'brush':
      return setTool(new Brush(imageId, canvas));
    case 'rectangle':
      return setTool(new Rectangle(imageId, canvas));
    case 'circle':
      return setTool(new Circle(imageId, canvas));
    case 'eraser':
      return setTool(new Eraser(imageId, canvas));
    case 'line':
      return setTool(new Line(imageId, canvas));
  }
};
