import { manager } from '@/shared/api/api';
import { canvasSocket } from '@/shared/api';
import { useImageId } from '@/shared/lib/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Brush } from '../../lib/tools/brush';
import { setCanvas } from '../../model/canvas.model';
import { setTool } from '../../model/tool.model';

export const Canvas = () => {
  const [canvasHeight, setCanvasHeight] = useState<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageId = useImageId();

  useEffect(() => {
    const canvas = canvasRef.current;

    canvasSocket.emit('joinRoom', imageId);

    if (canvas) {
      setTool(new Brush(imageId, canvas));
      setCanvas(canvas);
      setCanvasHeight(window.innerHeight - canvas.offsetTop);
    }
  }, []);

  return <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth} />;
};
