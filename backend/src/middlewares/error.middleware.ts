import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import DuplicateCategoryNameError from '../errors/duplicate-category-name.error';
import InvalidDataError from '../errors/invalid-data.error';
import InvalidTokenError from '../errors/invalid-token.error';
import NotFoundCategoryIdError from '../errors/notfound-category-id.error';
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

      case InvalidDataError:
        responseError(res, 400, error.message);
        break;

      case DuplicateCategoryNameError:
        responseError(res, 500, error.message);
        break;

      case NotFoundCategoryIdError:
        responseError(res, 500, error.message);
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
