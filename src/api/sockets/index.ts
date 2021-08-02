import { io } from 'socket.io-client';
import { SOCKET_URL } from '../../utils';
import { handleConnectUser } from '../handleConnectUser';
import { handleDrawUser } from '../handleDrawUser';

export const socket = io(SOCKET_URL);

socket.on('connect', handleConnectUser);
socket.on('message', handleDrawUser);
