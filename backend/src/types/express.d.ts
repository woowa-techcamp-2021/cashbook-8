import User from '../entities/user';

declare global {
 // eslint-disable-next-line no-unused-vars
 namespace Express {
    export interface Request {
      user: User;
    }
  }
}