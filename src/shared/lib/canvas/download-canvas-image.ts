export const downloadCanvasImage = (canvas: HTMLCanvasElement) => {
  const linkElement = document.createElement('a');
  const imageInBase64 = canvas.toDataURL();

  linkElement.href = imageInBase64;
  linkElement.download = 'image.jpg';

  document.body.appendChild(linkElement);

  linkElement.click();
  linkElement.remove();
};
