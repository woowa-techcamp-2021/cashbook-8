import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import User from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findByEmail (email: string): Promise<User | undefined> {
    return createQueryBuilder(User)
      .where({
        email
      })
      .getOne();
  }
}

export default UserRepository;
