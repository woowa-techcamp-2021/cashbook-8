import dotenv from '../../config/dotenv';
import { User } from '../types/user';
import authMiddleware from './middlewares/auth.middleware';
import { getAccessToken, getRequest } from './request';

class UserAPI {
  fetchMyProfile (): Promise<User> {
    return authMiddleware<User>(() => {
      const token = getAccessToken();

      return getRequest<User>(`${dotenv.API_URL}/user/my`, {
        headers: {
          Authorization: token
        }
      });
    });
  }
}

export default new UserAPI();
