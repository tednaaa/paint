import { Router } from 'express';
import { imageController } from './controllers';

export const router = Router();

router.post('/image', imageController.saveImage);
router.get('/image', imageController.getImage);
