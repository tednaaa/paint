import axios from 'axios';
import { Manager } from 'socket.io-client';
import { API_URL } from '../config';

export const apiInstance = axios.create({
  baseURL: `${API_URL}/api`,
});

export const manager = new Manager(API_URL);
