import { isProductionEnv } from './isProductionEnv';

export const DEFAULT_DRAW_COLOR = '#000';

export const { REACT_APP_API_URL } = process.env;

export const SOCKET_URL = isProductionEnv()
  ? `wss://${REACT_APP_API_URL?.replace('https://', '')}`
  : `ws://${REACT_APP_API_URL?.split('://')[1]}`;
