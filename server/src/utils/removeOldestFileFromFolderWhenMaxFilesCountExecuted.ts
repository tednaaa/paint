import fs from 'fs';
import path from 'path';
import { IMAGES_PATH } from './consts';
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

    images.forEach((image) => {
      try {
        if (
          getFileBirthTimeMsInFolder(IMAGES_PATH, image) ===
          getOldestFileMsInFolder(IMAGES_PATH, images)
        ) {
          deleteFileFromFolder(IMAGES_PATH, image);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
};
