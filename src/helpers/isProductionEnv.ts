export const isProductionEnv = () => {
  return process.env.NODE_ENV === 'production';
};
