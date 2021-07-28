import { NextFunction, Request, Response } from 'express';

const wrapAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next)
      .catch(next);
  };
};

export default wrapAsync;
