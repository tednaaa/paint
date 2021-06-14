import axios from 'axios';
import { REACT_APP_API_URL } from '../utils';

export const addCanvasImageOnServer = (
  canvas: HTMLCanvasElement,
  sessionId: string
) => {
  axios
    .post(`${REACT_APP_API_URL}/image?id=${sessionId}`, {
      image: canvas.toDataURL(),
    })
    .catch((error) => console.log(error));
};
