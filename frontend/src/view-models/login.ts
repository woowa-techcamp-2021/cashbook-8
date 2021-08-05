import dotenv from '../../config/dotenv';
import ViewModel from '../core/view-model';
import { buildURL } from '../utils/path';

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';

class LoginViewModel extends ViewModel {
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
