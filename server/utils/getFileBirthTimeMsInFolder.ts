import fs from 'fs';
import path from 'path';

export const getFileBirthTimeMsInFolder = (folder: string, image: string) => {
  return fs.statSync(path.join(__dirname, folder, image)).birthtimeMs;
};
