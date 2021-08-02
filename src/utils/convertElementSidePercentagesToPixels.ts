export const convertElementSidePercentagesToPixels = (
  side: number,
  percent: number
) => {
  return Math.floor((side * percent) / 100);
};
