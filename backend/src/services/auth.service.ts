import github from '../third-party/github';

class AuthService {
  async getAccessToken (code: string): Promise<string> {
    const { access_token: accessToken } = await github.authByCode(code);

    return accessToken;
  }
}

export default new AuthService();
