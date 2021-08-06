import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Category from '../entities/category';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  findAllByUserId (userId: number): Promise<Category[]> {
    return createQueryBuilder(Category)
      .where('user_id = :userId', { userId })
      .getMany();
  }

  findByUserAndName (userId: number, name: string): Promise<Category | undefined> {
    return createQueryBuilder(Category)
      .where('user_id = :userId', { userId })
      .andWhere('name = :name', { name })
      .getOne();
  }
}

export default CategoryRepository;
