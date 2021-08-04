import { io } from 'socket.io-client';
import { REACT_APP_API_URL } from '../../utils';
import { handleConnect, handleMessage } from './handlers';

export const socket = io(REACT_APP_API_URL);

socket.on('connect', handleConnect);
socket.on('hello', (roomId: string) => {
  console.log(roomId);
});
socket.on('message', handleMessage);
