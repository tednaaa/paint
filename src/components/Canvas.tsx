import { observer } from 'mobx-react-lite';
import { FC, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router';
import {
  getCanvasImageFromServer,
  handleConnectUser,
  handleDrawUser,
  saveCanvasImageOnServer,
  socket,
} from '../api';
import { UrlParams } from '../interfaces';
import { canvasState, sessionState, toolState } from '../store';
import { Brush } from '../tools';
import { setCanvasSize } from '../utils';
import '../styles/canvas.scss';

export const Canvas: FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useParams<UrlParams>();

  const handleDrawEnd = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvasState.pushToUndo(canvas.toDataURL());
      saveCanvasImageOnServer(canvas, params.id);
    }
  };

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      setCanvasSize(canvas);
      canvasState.setCanvas(canvas);
      sessionState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasState.canvas));

      socket.onopen = () => {
        handleConnectUser();
        handleDrawUser();
      };

      if (ctx) {
        getCanvasImageFromServer(canvas, ctx, params.id);
      }
    }
  }, [params.id]);

  return (
    <div className="canvas">
      <canvas
        onMouseUp={handleDrawEnd}
        onTouchEnd={handleDrawEnd}
        ref={canvasRef}
      ></canvas>
    </div>
  );
});
