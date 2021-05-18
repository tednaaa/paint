import { ParsedMessage } from '../interfaces';
import { broadcastConnection } from './broadcastConnection';
import { removeOldestFileFromFolderWhenMaxFilesCountExecuted } from './removeOldestFileFromFolderWhenMaxFilesCountExecuted';

export const handleConnection = (
  webSocket: any,
  aWss: any,
  message: ParsedMessage
) => {
  webSocket.id = message.id;

  removeOldestFileFromFolderWhenMaxFilesCountExecuted('../images', 10);
  broadcastConnection(aWss, message);
};
