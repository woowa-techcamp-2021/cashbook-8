import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../entities/user';
import ExpiredTokenError from '../errors/expired-token.error';
import InvalidTokenError from '../errors/invalid-token.error';
import jwtService from '../services/jwt.service';
import Builder from '../utils/builder';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization === null || authorization === undefined) {
    throw new InvalidTokenError('토큰이 존재하지 않습니다');
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const user = jwtService.verify(token);
    req.user = Builder<User>()
      .id(user.id)
      .name(user.name)
      .accessToken(user.accessToken)
      .avatarURL(user.avatarURL)
      .build();

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ExpiredTokenError('토큰이 만료됐습니다');
    }

    throw new InvalidTokenError('토큰이 옳지 않습니다');
  }
};

export default authMiddleware;
