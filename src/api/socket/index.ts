import { io } from 'socket.io-client';
import { REACT_APP_API_URL } from '../../config';
import { emitConnectToRoom } from './emits';
import { handleMessage } from './handlers';

export const socket = io(REACT_APP_API_URL);

socket.on('connect', emitConnectToRoom);
socket.on('message', handleMessage);
