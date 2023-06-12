import React, { useEffect, useRef, useState } from 'react';

import { ToolBar } from './tool-bar/tool-bar';
import { SettingsBar } from './settings-bar/settings-bar';

export const RootPage = () => {
  const [canvasHeight, setCanvasHeight] = useState<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      setCanvasHeight(window.innerHeight - canvas.offsetTop);
    }
  }, []);

  return (
    <div>
      <ToolBar canvas={canvasRef.current} />
      <SettingsBar />
      <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth} />
    </div>
  );
};
