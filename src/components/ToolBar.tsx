import { ChangeEvent, FC, useState } from 'react';
import { Tool, Brush, Rect, Circle, Eraser, Line } from '../tools';
import { canvasState, toolState } from '../store';
import { Burger } from '.';
import {
  DEFAULT_DRAW_COLOR,
  downloadCanvasImage,
  setDrawColor,
} from '../utils';
import '../styles/toolBar.scss';

export const ToolBar: FC = () => {
  const [isBurgerActive, setBurgerActive] = useState(false);
  const [color, setColor] = useState(DEFAULT_DRAW_COLOR);

  const setTool = (tool: Tool) => {
    toolState.setTool(tool);

    setDrawColor(color);
    setBurgerActive(false);
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const changedColor = event.currentTarget.value;

    setColor(changedColor);
    setDrawColor(changedColor);
  };

  return (
    <div className="toolbar">
      <Burger
        isBurgerActive={isBurgerActive}
        onClick={() => setBurgerActive((prev) => !prev)}
      />
      <div
        className={`toolbar__left ${
          isBurgerActive ? 'toolbar__left--active' : ''
        }`}
      >
        <button
          className="toolbar-item toolbar-item--brush"
          onClick={() => setTool(new Brush(canvasState.canvas))}
        ></button>
        <button
          className="toolbar-item toolbar-item--rect"
          onClick={() => setTool(new Rect(canvasState.canvas))}
        ></button>
        <button
          className="toolbar-item toolbar-item--circle"
          onClick={() => setTool(new Circle(canvasState.canvas))}
        ></button>
        <button
          className="toolbar-item toolbar-item--eraser"
          onClick={() => setTool(new Eraser(canvasState.canvas))}
        ></button>
        <button
          className="toolbar-item toolbar-item--line"
          onClick={() => setTool(new Line(canvasState.canvas))}
        ></button>
        <input
          className="toolbar-item"
          type="color"
          onChange={handleColorChange}
        />
      </div>
      <div className="toolbar__right">
        <button
          className="toolbar-item toolbar-item--undo"
          onClick={() => canvasState.undo()}
        ></button>
        <button
          className="toolbar-item toolbar-item--redo"
          onClick={() => canvasState.redo()}
        ></button>
        <button
          className="toolbar-item toolbar-item--save"
          onClick={downloadCanvasImage}
        ></button>
      </div>
    </div>
  );
};
