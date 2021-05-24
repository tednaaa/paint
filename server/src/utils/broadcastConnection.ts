import { ParsedMessage } from '../interfaces';

export const broadcastConnection = (aWss: any, message: ParsedMessage) => {
  aWss.clients.forEach((client: any) => {
    if (client.id === message.id) {
      client.send(JSON.stringify(message));
    }
  });
};
