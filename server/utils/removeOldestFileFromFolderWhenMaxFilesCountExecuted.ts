import fs from 'fs';
import path from 'path';
import { deleteFileFromFolder } from './deleteFileFromFolder';
import { getFileBirthTimeMsInFolder } from './getFileBirthTimeMsInFolder';
import { getOldestFileMsInFolder } from './getOldestFileMsInFolder';

export const removeOldestFileFromFolderWhenMaxFilesCountExecuted = (
  folder: string,
  maxImagesCount: number
) => {
  fs.readdir(path.join(__dirname, folder), (err, images) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    if (images.length < maxImagesCount) {
      return;
    }

    const imagesFolder = '../images';

    images.forEach((image) => {
      try {
        if (
          getFileBirthTimeMsInFolder(imagesFolder, image) ===
          getOldestFileMsInFolder(imagesFolder, images)
        ) {
          deleteFileFromFolder(imagesFolder, image);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
};
