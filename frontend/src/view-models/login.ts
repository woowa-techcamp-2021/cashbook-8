import ViewModel from '../core/view-model';
import { buildURL } from '../utils/path';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI as string;

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';

class LoginViewModel extends ViewModel {
  onGithubLoginClicked (): void {
    const url = buildURL(GITHUB_OAUTH_URL, {
      query: {
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: GITHUB_REDIRECT_URI
      }
    });

    location.href = url;
  }
}

export default LoginViewModel;
