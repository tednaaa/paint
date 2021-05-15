import { Request, Response } from 'express';
import { ImageRequestBody, ImageRequestQuery } from '../interfaces';
import { getImage, saveImage } from '../utils';

class ImageController {
  async saveImage(
    request: Request<null, null, ImageRequestBody, ImageRequestQuery>,
    response: Response
  ) {
    try {
      const image = request.body.image.replace('data:image/png;base64,', '');
      const filename = request.query.id;

      saveImage(image, filename);

      return response.status(200).json({ message: 'loaded' });
    } catch (error) {
      console.log(error);

      return response.status(500).json('error');
    }
  }

  async getImage(
    request: Request<null, null, ImageRequestBody, ImageRequestQuery>,
    response: Response
  ) {
    try {
      const filename = request.query.id;
      const image = getImage(filename);

      return response.json(image);
    } catch (error) {
      console.log(error);

      return response.status(500).json('error');
    }
  }
}

export const imageController = new ImageController();
