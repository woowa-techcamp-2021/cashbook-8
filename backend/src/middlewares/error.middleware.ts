import { NextFunction, Request, Response } from 'express';
import ServerError from '../errors/server.error';

const responseError = (res: Response, status: number, message: string) => {
  res.status(status).json({
    message
  });
};

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error.constructor);
  if (error) {
    switch (error.constructor) {
      case ServerError:
        responseError(res, 500, error.message);
        break;

      // no default
    }
  }

  next();
};

export default errorMiddleware;
