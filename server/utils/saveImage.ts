import fs from 'fs';
import path from 'path';

export const saveImage = (image: string, filename: string) => {
  fs.writeFileSync(
    path.resolve(__dirname, '../images', `${filename}.jpg`),
    image,
    'base64'
  );
};
