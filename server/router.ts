import { Router } from 'express';
import { clientController, imageController } from './controllers';

export const router = Router();

router.get('*', clientController.get);
router.get('/image', imageController.get);
router.post('/image', imageController.save);
