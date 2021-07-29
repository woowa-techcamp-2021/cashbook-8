import { getCustomRepository } from 'typeorm';
import Category from '../entities/category';
import User from '../entities/user';
import DuplicateCategoryNameError from '../errors/duplicate-category-name.error';
import NotFoundCategoryIdError from '../errors/notfound-category-id.error';
import ServerError from '../errors/server.error';
import CategoryRepository from '../repositories/category.repository';
import CategoryCreateRequest from '../request/category.request/category-create.request';
import Builder from '../utils/builder';

class CategoryService {
  async findCategories (userId: number): Promise<Category[] | undefined> {
    try {
      const categories = await getCustomRepository(CategoryRepository).findAllByUserId(userId);
      return categories;
    } catch (error) {
      throw new ServerError('카테고리를 불러오지 못했습니다');
    }
  }

  async createCategory (name: string, color: string, user: User): Promise<void> {
    const category = Builder<CategoryCreateRequest>()
      .name(name)
      .color(color)
      .user(user)
      .build();

    try {
      const item = await getCustomRepository(CategoryRepository).findByName(category.name);
      console.log(item);
      if (item !== undefined) {
        console.log('나를 지난다');
        throw new DuplicateCategoryNameError('해당 카테고리가 이미 존재합니다');
      }
      await getCustomRepository(CategoryRepository).insert(category);
    } catch (error) {
      throw new ServerError('카테고리 추가를 실패했습니다');
    }
  }

  async deleteCategory (id: number): Promise<void> {
    try {
      const category = await getCustomRepository(CategoryRepository).findOne(id);
      console.log(category);
      if (category === undefined) {
        throw new NotFoundCategoryIdError('존재하지 않는 카테고리입니다');
      }
      await getCustomRepository(CategoryRepository).delete(id);
    } catch (error) {
      throw new ServerError('카테고리 삭제를 실패했습니다');
    }
  }
}

export default new CategoryService();