import dotenv from '../../config/dotenv';
import { UserResponse } from '../types/user';
import authMiddleware from './middlewares/auth.middleware';
import { getAccessToken, getRequest } from './request';

class UserAPI {
  fetchMyProfile (): Promise<UserResponse> {
    return authMiddleware<UserResponse>(() => {
      const token = getAccessToken();

      return getRequest<UserResponse>(`${dotenv.API_URL}/user/my`, {
        headers: {
          Authorization: token
        }
      });
    });
  }
}

export default new UserAPI();
