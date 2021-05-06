export const { REACT_APP_HOST, REACT_APP_PORT } = process.env;

export const socket = new WebSocket(`ws://${REACT_APP_HOST}:${REACT_APP_PORT}`);
