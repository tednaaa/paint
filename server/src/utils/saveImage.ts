import fs from 'fs';
import path from 'path';
import { IMAGES_PATH } from './consts';

export const saveImage = (image: string, filename: string) => {
  fs.writeFileSync(
    path.resolve(__dirname, IMAGES_PATH, `${filename}.jpg`),
    image,
    'base64'
  );
};
