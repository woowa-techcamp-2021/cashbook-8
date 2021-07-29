import { getCustomRepository } from 'typeorm';
import Category from '../entities/category';
import User from '../entities/user';
import DuplicateCategoryError from '../errors/duplicate-category.error';
import NotFoundCategoryError from '../errors/notfound-category.error';
import ServerError from '../errors/server.error';
import CategoryRepository from '../repositories/category.repository';
import Builder from '../utils/builder';

class CategoryService {
  async findCategories (user: User): Promise<Category[] | undefined> {
    try {
      const categories = await getCustomRepository(CategoryRepository).findAllByUserId(user.id);
      return categories;
    } catch (error) {
      throw new ServerError('카테고리를 불러오지 못했습니다');
    }
  }

  async createCategory (category: Category, user: User): Promise<void> {
    const newCategory = Builder<Category>()
      .name(category.name)
      .color(category.color)
      .user(user)
      .build();

    try {
      const item = await getCustomRepository(CategoryRepository).findByName(category.name);
      console.log(item);
      if (item !== undefined) {
        console.log('나를 지난다');
        throw new DuplicateCategoryError('해당 카테고리가 이미 존재합니다');
      }
      await getCustomRepository(CategoryRepository).insert(newCategory);
    } catch (error) {
      throw new ServerError('카테고리 추가를 실패했습니다');
    }
  }

  async deleteCategory (id: number): Promise<void> {
    try {
      const category = await getCustomRepository(CategoryRepository).findOne(id);
      console.log(category);
      if (category === undefined) {
        throw new NotFoundCategoryError('존재하지 않는 카테고리입니다');
      }
      await getCustomRepository(CategoryRepository).delete(id);
    } catch (error) {
      throw new ServerError('카테고리 삭제를 실패했습니다');
    }
  }
}

export default new CategoryService();
