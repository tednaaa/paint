export const loadImage = (dataUrl: string, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  const image = new Image();

  image.src = dataUrl;

  image.onload = () => {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
};
