export const DEFAULT_DRAW_COLOR = '#000';

export let API_URL: string;
export let WEB_SOCKET_URL: string;

if (process.env.NODE_ENV === 'development') {
  API_URL = 'http://localhost:8080';
  WEB_SOCKET_URL = `ws://${API_URL.split('://')[1]}`;
} else {
  API_URL = window.location.host;
  WEB_SOCKET_URL = `wss://${API_URL}`;
}
