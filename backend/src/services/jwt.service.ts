import User from '../entities/user';
import * as jwt from 'jsonwebtoken';
import dotenv from '../config/dotenv';

class JwtService {
  generate (user: User) {
    console.log(user);
    const token = jwt.sign({ ...user }, dotenv.JWT_SECRET, {
      expiresIn: dotenv.JWT_EXPIRES_IN
    });
    return token;
  }

  verify (token: string) {
    return jwt.verify(token, dotenv.JWT_SECRET) as User;
  }
}

export default new JwtService();
