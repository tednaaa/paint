import { Request, Response } from 'express';
import path from 'path';

class ClientController {
  get(request: Request, response: Response) {
    response.sendFile(
      path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
  }
}

export const clientController = new ClientController();
