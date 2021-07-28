import fetch from 'node-fetch';
import dotenv from '../config/dotenv';
import { buildQuerystring } from '../utils/querystring';

const OAUTH_ENDPOINT = 'https://github.com/login/oauth';
const API_ENDPOINT = 'https://api.github.com';

type AuthResponse = {
  'access_token': string;
  'token_type': string;
  scope: string;
}

type GithubUserResponse = {
  login: string;
  email: string;
  'avatar_url': string;
}

class GithubThirdParty {
  async authByCode (code: string): Promise<AuthResponse> {
    const querystring = buildQuerystring({
      client_id: dotenv.GITHUB_CLIENT_ID,
      client_secret: dotenv.GITHUB_CLIENT_SECRETS,
      code
    });

    const res = await fetch(`${OAUTH_ENDPOINT}/access_token${querystring}`, {
      method: 'POST',
      headers: {
        accept: 'application/json'
      }
    });

    return res.json();
  }

  async fetchGithubUser (accessToken: string): Promise<GithubUserResponse> {
    const res = await fetch(`${API_ENDPOINT}/user`, {
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `Bearer ${accessToken}`
      }
    });

    return res.json();
  }
}

export default new GithubThirdParty();
