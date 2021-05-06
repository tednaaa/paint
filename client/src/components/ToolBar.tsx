import { FC, useEffect, useState } from 'react';
import { socket } from '../api';
import canvasState from '../store/canvasState';
import sessionState from '../store/sessionState';
import toolState from '../store/toolState';
import '../styles/toolBar.scss';
import { Brush } from '../tools/Brush';
import { Circle } from '../tools/Circle';
import { Eraser } from '../tools/Eraser';
import { Line } from '../tools/Line';
import { Rect } from '../tools/Rect';
import { Tool } from '../tools/Tool';
import { Burger } from './Burger';

export const ToolBar: FC = () => {
  const [isBurgerActive, setBurgerActive] = useState(false);
  const [color, setColor] = useState('#000');

  const setTool = (tool: Tool) => {
    toolState.setTool(tool);

    toolState.setStrokeColor(color);

    setBurgerActive(false);
  };

  useEffect(() => {
    toolState.setFillColor(color);
    toolState.setStrokeColor(color);
  }, [color]);

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = sessionState.id + '.jpg';
    document.body.appendChild(link);
    link.click();
    link.remove();
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
          onClick={() =>
            setTool(new Brush(canvasState.canvas, socket, sessionState.id))
          }
        ></button>
        <button
          className="toolbar-item toolbar-item--rect"
          onClick={() =>
            setTool(new Rect(canvasState.canvas, socket, sessionState.id))
          }
        ></button>
        <button
          className="toolbar-item toolbar-item--circle"
          onClick={() =>
            setTool(new Circle(canvasState.canvas, socket, sessionState.id))
          }
        ></button>
        <button
          className="toolbar-item toolbar-item--eraser"
          onClick={() =>
            setTool(new Eraser(canvasState.canvas, socket, sessionState.id))
          }
        ></button>
        <button
          className="toolbar-item toolbar-item--line"
          onClick={() =>
            setTool(new Line(canvasState.canvas, socket, sessionState.id))
          }
        ></button>
        <input
          className="toolbar-item"
          type="color"
          onChange={(event) => setColor(event.currentTarget.value)}
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
          onClick={download}
        ></button>
      </div>
    </div>
  );
};
