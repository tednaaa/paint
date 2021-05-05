export const validateInputLineWidth = (
  lineWidth: number,
  minLength: number,
  maxLength: number,
  callback: Function
) => {
  if (lineWidth >= minLength && lineWidth <= maxLength) {
    callback();
  }
};
