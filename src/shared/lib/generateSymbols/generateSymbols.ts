export const generateSymbols = (radix: number) => {
  return Number(new Date()).toString(radix);
};
