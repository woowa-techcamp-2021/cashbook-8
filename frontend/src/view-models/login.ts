import dotenv from '../../config/dotenv';
import ViewModel from '../core/view-model';
import { buildURL } from '../utils/path';
import userAPI from '../api/user';
import toast from '../utils/toast/toast';
import Router from '../core/router';
import cookie from '../utils/cookie';

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';

class LoginViewModel extends ViewModel {
  async onGuestLoginClicked (): Promise<void> {
    try {
      const { accessToken } = await userAPI.guestLogin();
      cookie.set('accessToken', accessToken);
      Router.instance.push('');
    } catch (error) {
      if (error.status === 404) {
        toast.error('게스트 계정이 없습니다. 관리자에게 문의하세요');
      } else {
        toast.error('다시 시도해주세요');
      }
    }
  }

  onGithubLoginClicked (): void {
    const url = buildURL(GITHUB_OAUTH_URL, {
      query: {
        client_id: dotenv.GITHUB_CLIENT_ID,
        redirect_uri: dotenv.GITHUB_REDIRECT_URI
      }
    });

    location.href = url;
  }
}

export default LoginViewModel;
