export const downloadCanvasImage = (canvas: HTMLCanvasElement, imageId: string) => {
  const linkElement = document.createElement('a');
  const imageInBase64 = canvas.toDataURL();

  linkElement.href = imageInBase64;
  linkElement.download = `${imageId}.jpg`;

  document.body.appendChild(linkElement);
  linkElement.click();
  linkElement.remove();
};
