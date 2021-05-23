import { API_URL } from '../utils';

export const socket = new WebSocket(`wss://${API_URL}`);
