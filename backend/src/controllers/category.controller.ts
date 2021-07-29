import { Request, Response } from 'express';
import categoryService from '../services/category.service';
import CategoryCreateRequest from '../request/category.request/category-create.request';
import { isNumberString } from 'class-validator';
import InvalidDataError from '../errors/invalid-data.error';

class CategoryController {
  async findCategories (req: Request, res: Response) {
    const { user } = req;

    const categories = await categoryService.findCategories(user);

    res.status(200).json({
      message: '카테고리 조회에 성공했습니다',
      categories
    });
  }

  async createCategory (req: Request, res: Response) {
    const { user } = req;

    const category = req.body;
    const categoryCreateRequest = new CategoryCreateRequest(category);
    await categoryCreateRequest.validate();

    await categoryService.createCategory(category, user);

    res.status(200).json({
      message: '카테고리가 생성되었습니다'
    });
  }

  async deleteCategory (req: Request, res: Response) {
    const { id } = req.params;

    if (!isNumberString(id)) {
      throw new InvalidDataError('카테고리 아이디 타입이 올바르지 않습니다');
    }

    await categoryService.deleteCategory(Number(id));

    res.status(200).json({
      message: `${id}번 카테고리가 삭제되었습니다`
    });
  }
}

export default new CategoryController();
