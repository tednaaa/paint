import { saveCanvasImageOnServer } from '../../api';
import { canvasState } from '../../store';

export const handleDrawEnd = (
  canvas: HTMLCanvasElement | null,
  imageName: string
) => {
  if (canvas) {
    canvasState.pushToUndo(canvas.toDataURL());
    saveCanvasImageOnServer(canvas, imageName);
  }
};
