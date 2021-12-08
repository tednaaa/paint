import { useLocation } from 'react-router';

export const useImageId = (): string => {
  const { pathname } = useLocation();

  return pathname;
};
