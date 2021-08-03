import { io } from 'socket.io-client';
import { REACT_APP_API_URL } from '../../utils';

export const socket = io(REACT_APP_API_URL);
