import User from '../entities/user';
import * as jwt from 'jsonwebtoken';
import dotenv from '../config/dotenv';

class JwtService {
  async generate (user: User) {
    const token = jwt.sign(user, dotenv.JWT_SECRET, {
      expiresIn: dotenv.JWT_EXPIRES_IN
    });
    return token;
  }

  async verify (token: string) {
    return jwt.verify(token, dotenv.JWT_SECRET);
  }
}

export default new JwtService();
