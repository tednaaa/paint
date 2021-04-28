import { observer } from 'mobx-react-lite';
import { useLayoutEffect, useRef } from 'react';
import { useCanvasSize } from '../hooks/useCanvasSize';
import canvasState from '../store/canvasState';
import '../styles/canvas.scss';

export const Canvas: React.FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    useCanvasSize(canvasRef.current!);
    canvasState.setCanvas(canvasRef.current!);

    window.addEventListener('resize', () => useCanvasSize(canvasRef.current!));

    return () => {
      window.removeEventListener('resize', () => {
        useCanvasSize(canvasRef.current!);
      });
    };
  }, []);

  return (
    <div className="canvas">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
});
