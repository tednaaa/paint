import { observer } from 'mobx-react-lite';
import { FC, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router';
import {
  addCanvasImageOnServer,
  getCanvasImageFromServer,
  handleConnectUser,
  handleDrawUser,
  socket,
} from '../api';
import { UrlParams } from '../interfaces';
import { authModalState, canvasState, sessionState, toolState } from '../store';
import '../styles/canvas.scss';
import { Brush } from '../tools';
import { setCanvasSize } from '../utils/setCanvasSize';

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

      setCanvasSize(canvas);
      canvasState.setCanvas(canvas);
      authModalState.setActive(false);
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
