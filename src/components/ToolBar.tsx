import { ChangeEvent, useState } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss';
import { Brush } from '../tools/Brush';
import { Circle } from '../tools/Circle';
import { Eraser } from '../tools/Eraser';
import { Line } from '../tools/Line';
import { Rect } from '../tools/Rect';
import { Tool } from '../tools/Tool';
import { Burger } from './Burger';

export const ToolBar: React.FC = () => {
  const [isBurgerActive, setBurgerActive] = useState(false);

  const setTool = (tool: Tool) => {
    toolState.setTool(tool);
    setBurgerActive(false);
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event.currentTarget.value;

    toolState.setFillColor(color);
    toolState.setStrokeColor(color);
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
        <button className="toolbar-item toolbar-item--save"></button>
      </div>
    </div>
  );
};
