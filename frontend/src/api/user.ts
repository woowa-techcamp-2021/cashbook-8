import dotenv from '../../config/dotenv';
import { GuestLoginResponse, UserResponse } from '../types/user';
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

  guestLogin (): Promise<GuestLoginResponse> {
    return authMiddleware<GuestLoginResponse>(() => {
      return getRequest(`${dotenv.API_URL}/auth/login/guest`, { });
    });
  }
}

export default new UserAPI();
