import axios from 'axios';
import { API_URL } from '../utils';

export const addCanvasImageOnServer = (
  canvas: HTMLCanvasElement,
  sessionId: string
) => {
  axios
    .post(`${API_URL}/image?id=${sessionId}`, {
      image: canvas.toDataURL(),
    })
    .catch((error) => console.log(error));
};
