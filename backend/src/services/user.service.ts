import { getCustomRepository } from 'typeorm';
import User from '../entities/user';
import UserRepository from '../repositories/user.repository';
import github from '../third-party/github';

class UserService {
  async syncUser (accessToken: string): Promise<User> {
    const githubUser = await github.fetchGithubUser(accessToken);
    let user = await getCustomRepository(UserRepository).findByEmail(githubUser.email);
    if (user === undefined) {
      user = new User();
    }

    user = getCustomRepository(UserRepository).merge(user, {
      email: githubUser.email,
      avatarURL: githubUser.avatar_url,
      name: githubUser.login,
      accessToken
    });

    return getCustomRepository(UserRepository).save(user);
  }
}

export default new UserService();
