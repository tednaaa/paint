import { IBrush, ICircle, IEraser, ILine, IRectangle } from '../interfaces';

export type IFigure = IBrush | IRectangle | ICircle | IEraser | ILine;
export type IColor = string | CanvasGradient | CanvasPattern;
