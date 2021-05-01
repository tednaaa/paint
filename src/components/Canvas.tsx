import { observer } from 'mobx-react-lite';
import { FC, useLayoutEffect, useRef } from 'react';
import { useCanvasSize } from '../hooks/useCanvasSize';
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

      window.addEventListener('resize', () => useCanvasSize(canvas));

      return () => {
        window.removeEventListener('resize', () => {
          useCanvasSize(canvas);
        });
      };
    }
  }, []);

  return (
    <div className="canvas">
      <canvas
        onMouseDown={handleDrawEnd}
        onTouchEnd={handleDrawEnd}
        ref={canvasRef}
      ></canvas>
    </div>
  );
});
