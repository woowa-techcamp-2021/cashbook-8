import { getCustomRepository } from 'typeorm';
import User from '../entities/user';
import UserRepository from '../repositories/user.repository';
import github from '../third-party/github';

class UserService {
  async syncUser (accessToken: string): Promise<User> {
    const githubUser = await github.fetchGithubUser(accessToken);
    let user = await getCustomRepository(UserRepository).findByName(githubUser.login);
    if (user === undefined) {
      user = new User();
    }

    user = getCustomRepository(UserRepository).merge(user, {
      avatarURL: githubUser.avatar_url,
      name: githubUser.login,
      accessToken
    });

    return getCustomRepository(UserRepository).save(user);
  }
}

export default new UserService();
