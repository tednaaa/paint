export const useCanvasSize = (canvas: HTMLCanvasElement | null) => {
  if (canvas) {
    canvas.setAttribute('height', getCanvasSize(window.innerHeight, 80));
    canvas.setAttribute('width', getCanvasSize(window.innerWidth, 90));
  }
};

const getCanvasSize = (side: number, percent: number) => {
  return Math.floor((side * percent) / 100).toString();
};
