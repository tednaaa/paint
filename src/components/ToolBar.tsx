import { ChangeEvent, FC, useState } from 'react';
import { Tool, Brush, Rect, Circle, Eraser, Line } from '../tools';
import { canvasState, toolState } from '../store';
import { Burger } from '.';
import {
  DEFAULT_DRAW_COLOR,
  downloadCanvasImage,
  setDrawColor,
} from '../utils';
import '../styles/tool-bar.scss';

interface Props {
  toolBarRef: React.LegacyRef<HTMLDivElement>;
}

export const ToolBar: FC<Props> = ({ toolBarRef }) => {
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
    <div className="tool-bar" ref={toolBarRef}>
      <Burger
        isBurgerActive={isBurgerActive}
        onClick={() => setBurgerActive((prev) => !prev)}
      />
      <div
        className={`tool-bar__left ${
          isBurgerActive ? 'tool-bar__left--active' : ''
        }`}
      >
        <button
          className="tool-bar-item tool-bar-item--brush"
          onClick={() => setTool(new Brush(canvasState.canvas))}
        ></button>
        <button
          className="tool-bar-item tool-bar-item--rect"
          onClick={() => setTool(new Rect(canvasState.canvas))}
        ></button>
        <button
          className="tool-bar-item tool-bar-item--circle"
          onClick={() => setTool(new Circle(canvasState.canvas))}
        ></button>
        <button
          className="tool-bar-item tool-bar-item--eraser"
          onClick={() => setTool(new Eraser(canvasState.canvas))}
        ></button>
        <button
          className="tool-bar-item tool-bar-item--line"
          onClick={() => setTool(new Line(canvasState.canvas))}
        ></button>
        <input
          className="tool-bar-item"
          type="color"
          onChange={handleColorChange}
        />
      </div>
      <div className="tool-bar__right">
        <button
          className="tool-bar-item tool-bar-item--undo"
          onClick={() => canvasState.undo()}
        ></button>
        <button
          className="tool-bar-item tool-bar-item--redo"
          onClick={() => canvasState.redo()}
        ></button>
        <button
          className="tool-bar-item tool-bar-item--save"
          onClick={downloadCanvasImage}
        ></button>
      </div>
    </div>
  );
};
