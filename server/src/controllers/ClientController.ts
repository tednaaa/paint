import { Request, Response } from 'express';
import path from 'path';
import { isProductionEnv } from '../utils';

class ClientController {
  get(request: Request, response: Response) {
    if (isProductionEnv()) {
      response.sendFile(
        path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
      );
    }
  }
}

export const clientController = new ClientController();
