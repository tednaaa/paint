import fs from 'fs';
import path from 'path';
import { IMAGES_PATH } from './consts';

export const getImage = (filename: string) => {
  const file = fs.readFileSync(
    path.resolve(__dirname, IMAGES_PATH, `${filename}.jpg`)
  );
  const image = 'data:image/png;base64,' + file.toString('base64');

  return image;
};
