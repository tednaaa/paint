import React, { useEffect, useRef, useState } from 'react';
import { Brush } from '../../lib/tools/brush';
import { setCanvas } from '../../model/canvas.model';
import { setTool } from '../../model/tool.model';

export const Canvas = () => {
  const [canvasHeight, setCanvasHeight] = useState<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      setTool(new Brush(canvas));
      setCanvas(canvas);
      setCanvasHeight(window.innerHeight - canvas.offsetTop);
    }
  }, []);

  return <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth} />;
};
