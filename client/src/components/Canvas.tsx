import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { FC, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { REACT_APP_HOST, REACT_APP_PORT } from '../api';
import { useCanvasSize } from '../hooks';
import { UrlParams } from '../interfaces';
import { authModalState, canvasState } from '../store';
import '../styles/canvas.scss';

export const Canvas: FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useParams<UrlParams>();

  const handleDrawEnd = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL());

      axios
        .post(
          `http://${REACT_APP_HOST}:${REACT_APP_PORT}/image?id=${params.id}`,
          {
            image: canvasRef.current.toDataURL(),
          }
        )
        .catch((error) => console.log(error));
    }
  };

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      useCanvasSize(canvas);
      canvasState.setCanvas(canvas);

      axios
        .get(`http://${REACT_APP_HOST}:${REACT_APP_PORT}/image?id=${params.id}`)
        .then((response) => {
          const image = new Image();

          image.src = response.data;
          image.onload = () => {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx?.fill();
          };
        })
        .catch((error) => console.log(error));
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
