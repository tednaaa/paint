import { getFileBirthTimeMsInFolder } from './getFileBirthTimeMsInFolder';

export const getOldestFileMsInFolder = (folder: string, files: string[]) => {
  return Math.min(
    ...files.map((file) => getFileBirthTimeMsInFolder(folder, file))
  );
};
