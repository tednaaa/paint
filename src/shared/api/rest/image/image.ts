import { apiInstance } from '../../api';

const route = '/image';

export class ImageService {
  static create(roomId: string, image: string) {
    return apiInstance.post(route, { roomId, image });
  }

  static fetch(roomId: string) {
    return apiInstance.get(`${route}${roomId}`);
  }
}
