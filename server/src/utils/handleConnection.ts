import { ParsedMessage } from '../interfaces';
import { broadcastConnection } from './broadcastConnection';
import { IMAGES_PATH } from './consts';
import { removeOldestFileFromFolderWhenMaxFilesCountExecuted } from './removeOldestFileFromFolderWhenMaxFilesCountExecuted';

export const handleConnection = (
  webSocket: any,
  aWss: any,
  message: ParsedMessage
) => {
  webSocket.id = message.id;

  removeOldestFileFromFolderWhenMaxFilesCountExecuted(IMAGES_PATH, 10);
  broadcastConnection(aWss, message);
};
