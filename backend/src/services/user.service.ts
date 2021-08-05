import { getCustomRepository } from 'typeorm';
import dotenv from '../config/dotenv';
import User from '../entities/user';
import NotfoundUserError from '../errors/not-found-user.error';
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

  async findGuestUser (): Promise<User> {
    const guest = await getCustomRepository(UserRepository).findOne(Number(dotenv.GUEST_ID));
    if (guest === undefined) {
      throw new NotfoundUserError('게스트 유저가 없습니다');
    }

    return guest;
  }
}

export default new UserService();
