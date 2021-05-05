import { observer } from 'mobx-react-lite';
import { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { socket } from '../api';
import { useCanvasSize } from '../hooks/useCanvasSize';
import { UrlParams } from '../interfaces';
import authModalState from '../store/authModalState';
import canvasState from '../store/canvasState';
import '../styles/canvas.scss';

export const Canvas: FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useParams<UrlParams>();

  const handleDrawEnd = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL());
    }
  };

  useEffect(() => {
    if (canvasState.username) {
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: 'connect',
          })
        );
      };

      socket.onmessage = (event: MessageEvent) => {
        console.log(event.data);
      };
    }
  }, [params.id]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      useCanvasSize(canvas);
      canvasState.setCanvas(canvas);
    }
  }, []);

  return (
    <div className={`canvas ${!authModalState.isActive ? 'canvas--show' : ''}`}>
      <canvas
        onMouseDown={handleDrawEnd}
        onTouchStart={handleDrawEnd}
        ref={canvasRef}
      ></canvas>
    </div>
  );
});
