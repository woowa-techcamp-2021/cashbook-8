import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Category from '../entities/category';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  findAllByUserId (userId: number): Promise<Category[] | undefined> {
    return createQueryBuilder(Category)
      .where('user_id = :userId', { userId })
      .getMany();
  }

  findByName (name: string): Promise<Category | undefined> {
    return createQueryBuilder(Category)
      .where({
        name
      })
      .getOne();
  }
}

export default CategoryRepository;
