import { observer } from 'mobx-react-lite';
import { FC, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { getCanvasImageFromServer } from '../api';
import { IUrlParams } from '../interfaces';
import { canvasState, sessionState, toolState } from '../store';
import '../styles/canvas.scss';
import { Brush } from '../tools';
import {
  convertElementSidePercentagesToPixels,
  handleDrawEnd,
  setCanvasSize,
} from '../utils';

interface Props {
  offsetOfTopElements: number;
}

export const Canvas: FC<Props> = observer(({ offsetOfTopElements }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useParams<IUrlParams>();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      const canvasHeight = document.body.clientHeight - offsetOfTopElements;
      const canvasWidth = convertElementSidePercentagesToPixels(
        window.innerWidth,
        100
      );

      setCanvasSize(canvas, canvasHeight, canvasWidth);
      canvasState.setCanvas(canvas);
      sessionState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasState.canvas));

      if (ctx) {
        getCanvasImageFromServer(canvas, ctx, params.id);
      }
    }
  }, [params.id, offsetOfTopElements]);

  return (
    <canvas
      onMouseUp={() => handleDrawEnd(canvasRef.current, params.id)}
      onTouchEnd={() => handleDrawEnd(canvasRef.current, params.id)}
      ref={canvasRef}
    ></canvas>
  );
});
