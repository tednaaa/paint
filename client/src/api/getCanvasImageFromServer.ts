import axios from 'axios';
import { API_URL } from '../utils';

export const getCanvasImageFromServer = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  sessionId: string
) => {
  axios
    .get(`http://${API_URL}/image?id=${sessionId}`)
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
};
