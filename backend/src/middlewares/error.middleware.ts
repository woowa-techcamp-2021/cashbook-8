import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import DuplicateCategoryError from '../errors/duplicate-category.error';
import DuplicatePaymentError from '../errors/duplicate-payment.error';
import InvalidDataError from '../errors/invalid-data.error';
import InvalidTokenError from '../errors/invalid-token.error';
import NotfoundUserError from '../errors/not-found-user.error';
import NotMyCashHistoryError from '../errors/not-my-cash-history.error';
import NotMyCategoryError from '../errors/not-my-category.error';
import NotMyPaymentError from '../errors/not-my-payment.error';
import NotfoundCashHistoryError from '../errors/notfound-cash-history.error';
import NotfoundCategoryError from '../errors/notfound-category.error';
import ServerError from '../errors/server.error';

const responseError = (res: Response, status: number, message: string) => {
  res.status(status).json({
    message
  });
};

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
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

      case DuplicateCategoryError:
        responseError(res, 409, error.message);
        break;

      case DuplicatePaymentError:
        responseError(res, 409, error.message);
        break;

      case NotMyCashHistoryError:
        responseError(res, 403, error.message);
        break;

      case NotMyCategoryError:
        responseError(res, 403, error.message);
        break;

      case NotMyPaymentError:
        responseError(res, 403, error.message);
        break;

      case NotfoundCashHistoryError:
        responseError(res, 404, error.message);
        break;

      case NotfoundCategoryError:
        responseError(res, 404, error.message);
        break;

      case NotfoundUserError:
        responseError(res, 404, error.message);
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
