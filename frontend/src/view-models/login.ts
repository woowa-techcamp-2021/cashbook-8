import ViewModel from '../core/view-model';
import { buildURL } from '../utils/path';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI as string;

class LoginViewModel extends ViewModel {
  onGithubLoginClicked (): void {
    // URL 상수 분리 필요
    const url = buildURL('https://github.com/login/oauth/authorize', {
      query: {
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: GITHUB_REDIRECT_URI
      }
    });

    location.href = url;
  }
}

export default LoginViewModel;
