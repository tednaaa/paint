import { useState } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss';
import { Brush } from '../tools/Brush';
import { Rect } from '../tools/Rect';
import { Tool } from '../tools/Tool';
import { Burger } from './Burger';

export const ToolBar: React.FC = () => {
  const [isBurgerActive, setBurgerActive] = useState(false);

  const setTool = (tool: Tool) => {
    toolState.setTool(tool);
    setBurgerActive(false);
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
        <button className="toolbar-item toolbar-item--circle"></button>
        <button className="toolbar-item toolbar-item--eraser"></button>
        <button className="toolbar-item toolbar-item--line"></button>
        <input className="toolbar-item" type="color" />
      </div>
      <div className="toolbar__right">
        <button className="toolbar-item toolbar-item--undo"></button>
        <button className="toolbar-item toolbar-item--redo"></button>
        <button className="toolbar-item toolbar-item--save"></button>
      </div>
    </div>
  );
};
