import { observer } from 'mobx-react-lite';
import { FC, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { addCanvasImageOnServer, getCanvasImageFromServer } from '../api';
import { useCanvasSize } from '../hooks';
import { UrlParams } from '../interfaces';
import { authModalState, canvasState } from '../store';
import '../styles/canvas.scss';

export const Canvas: FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useParams<UrlParams>();

  const handleDrawEnd = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvasState.pushToUndo(canvas.toDataURL());
      addCanvasImageOnServer(canvas, params.id);
    }
  };

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      useCanvasSize(canvas);
      canvasState.setCanvas(canvas);

      if (ctx) {
        getCanvasImageFromServer(canvas, ctx, params.id);
      }
    }
  }, [params.id]);

  return (
    <div className={`canvas ${!authModalState.isActive ? 'canvas--show' : ''}`}>
      <canvas
        onMouseUp={handleDrawEnd}
        onTouchEnd={handleDrawEnd}
        ref={canvasRef}
      ></canvas>
    </div>
  );
});
