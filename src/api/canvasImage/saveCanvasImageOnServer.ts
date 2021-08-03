import axios from 'axios';
import { REACT_APP_API_URL } from '../../utils';

export const saveCanvasImageOnServer = (
  canvas: HTMLCanvasElement,
  sessionId: string
) => {
  axios
    .post(`${REACT_APP_API_URL}/image/save?id=${sessionId}`, {
      image: canvas.toDataURL(),
    })
    .catch((error) => console.log(error));
};
