import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import User from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findByName (name: string): Promise<User | undefined> {
    return createQueryBuilder(User)
      .where({
        name
      })
      .getOne();
  }
}

export default UserRepository;
