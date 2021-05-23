import { Request, Response } from 'express';
import path from 'path';

class ClientController {
  get(request: Request, response: Response) {
    if (process.env.NODE_ENV !== 'development') {
      response.sendFile(
        path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
      );
    }
  }
}

export const clientController = new ClientController();
