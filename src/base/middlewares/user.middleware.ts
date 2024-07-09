import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserModule called');
    next();
  }
}
