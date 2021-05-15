import { ParsedMessage } from '../interfaces';
import { broadcastConnection } from './broadcastConnection';

export const handleConnection = (
  webSocket: any,
  aWss: any,
  message: ParsedMessage
) => {
  webSocket.id = message.id;

  broadcastConnection(aWss, message);
};
