import { observer } from 'mobx-react-lite';
import { FC, useLayoutEffect, useRef } from 'react';
import { useCanvasSize } from '../hooks/useCanvasSize';
import authModalState from '../store/authModalState';
import canvasState from '../store/canvasState';
import '../styles/canvas.scss';

export const Canvas: FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDrawEnd = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL());
    }
  };

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      useCanvasSize(canvas);
      canvasState.setCanvas(canvas);
    }
  }, []);

  return (
    <div
      className={`canvas ${!authModalState.isActive ? 'canvas--show' : ''}`}
    >
      <canvas
        onMouseDown={handleDrawEnd}
        onTouchStart={handleDrawEnd}
        ref={canvasRef}
      ></canvas>
    </div>
  );
});
