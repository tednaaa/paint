import { canvasState, sessionState } from '../store';

export const downloadCanvasImage = () => {
  const linkElement = document.createElement('a');
  const dataUrl = canvasState.canvas.toDataURL();

  linkElement.href = dataUrl;
  linkElement.download = sessionState.id + '.jpg';

  document.body.appendChild(linkElement);

  linkElement.click();
  linkElement.remove();
};
