import { HOST as REACT_APP_HOST, PORT as REACT_APP_PORT } from '../utils';

export const socket = new WebSocket(`wss://${REACT_APP_HOST}`);
