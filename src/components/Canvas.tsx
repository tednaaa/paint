import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import { Brush } from '../tools/Brush';

export const Canvas: React.FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current))
  }, []);

  return (
    <div className="canvas">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
});
