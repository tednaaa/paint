import { createApi, createStore } from 'effector';
import { canvasSocket } from '@/shared/api';

export const $canvas = createStore<HTMLCanvasElement>(null);

export const { setCanvas } = createApi($canvas, {
  setCanvas: (_, canvas: HTMLCanvasElement) => canvas,
});

canvasSocket.on('draw', (toolName: string, coordinates) => {
  const ctx = $canvas.getState().getContext('2d');

  if (!ctx) return;

  if (toolName === 'brush') {
    const { currentX, currentY } = coordinates;

    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    return;
  }

  if (toolName === 'rectangle') {
    const { currentX, currentY, width, height } = coordinates;

    ctx.rect(currentX, currentY, width, height);
    ctx.fill();
    return;
  }

  if (toolName === 'circle') {
    const { startX, startY, radius } = coordinates;

    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.fill();
    return;
  }

  if (toolName === 'eraser') {
    const { currentX, currentY } = coordinates;

    ctx.strokeStyle = '#fff';
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    return;
  }

  if (toolName === 'line') {
    const { startX, startY, currentX, currentY } = coordinates;

    ctx.moveTo(startX, startY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    return;
  }
});
