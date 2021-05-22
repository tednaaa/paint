import axios from 'axios';
import { HOST as REACT_APP_HOST, PORT as REACT_APP_PORT } from '../utils';

export const addCanvasImageOnServer = (
  canvas: HTMLCanvasElement,
  sessionId: string
) => {
  axios
    .post(`http://${REACT_APP_HOST}:${REACT_APP_PORT}/image?id=${sessionId}`, {
      image: canvas.toDataURL(),
    })
    .catch((error) => console.log(error));
};
