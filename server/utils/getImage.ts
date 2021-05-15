import fs from 'fs';
import path from 'path';

export const getImage = (filename: string) => {
  const file = fs.readFileSync(
    path.resolve(__dirname, '../images', `${filename}.jpg`)
  );
  const image = 'data:image/png;base64,' + file.toString('base64');

  return image;
};
