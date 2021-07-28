import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import InvalidTokenError from '../errors/invalid-token.error';
import ServerError from '../errors/server.error';

const responseError = (res: Response, status: number, message: string) => {
  res.status(status).json({
    message
  });
};

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error) {
    switch (error.constructor) {
      case InvalidTokenError:
        responseError(res, 401, error.message);
        break;

      case TokenExpiredError:
        responseError(res, 410, error.message);
        break;

      case ServerError:
      default:
        responseError(res, 500, error.message);
        break;
    }
  }

  next();
};

export default errorMiddleware;
