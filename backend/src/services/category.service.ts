import { getCustomRepository } from 'typeorm';
import Category from '../entities/category';
import User from '../entities/user';
import DuplicateCategoryError from '../errors/duplicate-category.error';
import NotMyCategoryError from '../errors/not-my-category.error';
import NotfoundCategoryError from '../errors/notfound-category.error';
import CategoryRepository from '../repositories/category.repository';
import Builder from '../utils/builder';

class CategoryService {
  async findCategories (user: User): Promise<Category[]> {
    const categories = await getCustomRepository(CategoryRepository).findAllByUserId(user.id);
    return categories;
  }

  async createCategory (category: Category, user: User): Promise<void> {
    const newCategory = Builder<Category>()
      .name(category.name)
      .color(category.color)
      .type(category.type)
      .user(user)
      .build();

    const duplicatedCategory = await getCustomRepository(CategoryRepository).findByName(newCategory.name);
    if (duplicatedCategory !== undefined) {
      throw new DuplicateCategoryError('해당 카테고리가 이미 존재합니다');
    }
    await getCustomRepository(CategoryRepository).save(newCategory);
  }

  async deleteCategory (id: number, user: User): Promise<void> {
    const category = await getCustomRepository(CategoryRepository).findOne(id);

    if (category === undefined) {
      throw new NotfoundCategoryError('존재하지 않는 카테고리입니다');
    }

    if (category.userId !== user.id) {
      throw new NotMyCategoryError('삭제 권한이 없습니다');
    }

    await getCustomRepository(CategoryRepository).delete(category.id);
  }
}

export default new CategoryService();
