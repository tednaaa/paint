import fs from 'fs';
import path from 'path';

export const deleteFileFromFolder = (folder: string, file: string) => {
  fs.unlinkSync(path.join(__dirname, folder, file));
};
