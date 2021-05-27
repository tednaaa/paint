import { isProductionEnv } from './isProductionEnv';

export const DEFAULT_DRAW_COLOR = '#000';

export const API_URL = isProductionEnv()
  ? window.location.host
  : 'http://localhost:8080';

export const SOCKET_URL = isProductionEnv()
  ? `wss://${API_URL}`
  : `ws://${API_URL.split('://')[1]}`;
