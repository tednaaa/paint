import { getCanvasSizeInPercent } from "./getCanvasSizeInPercent";

export const setCanvasSize = (canvas: HTMLCanvasElement) => {
  canvas.height = getCanvasSizeInPercent(window.innerHeight, 80);
  canvas.width = getCanvasSizeInPercent(window.innerWidth, 90);
};
