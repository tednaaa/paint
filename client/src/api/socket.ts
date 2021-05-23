import { API_URL } from '../utils';

export const socket = new WebSocket(`ws://${API_URL}`);
