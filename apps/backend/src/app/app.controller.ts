import { Request, Response } from 'express';
import { AppService } from './app.service';

export class AppController {
  private appService = new AppService();

  getData(req: Request, res: Response) {
    return res.json(this.appService.getData());
  }
}
