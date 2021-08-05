import dotenv from '../../config/dotenv';
import { CashHistories } from '../enums/cash-history.enum';
import { CategoriesResponse } from '../types/category';
import authMiddleware from './middlewares/auth.middleware';
import { deleteRequest, getAccessToken, getRequest, postRequest } from './request';

class CategoryAPI {
  fetchCategories (): Promise<CategoriesResponse> {
    return authMiddleware<CategoriesResponse>(() => {
      const token = getAccessToken();

      return getRequest<CategoriesResponse>(`${dotenv.API_URL}/category/all`, {
        headers: {
          Authorization: token
        }
      });
    });
  }

  createCategory (value: string, color: string, type: CashHistories): Promise<void> {
    return authMiddleware<void>(() => {
      const token = getAccessToken();

      return postRequest(`${dotenv.API_URL}/category`, {
        body: {
          name: value,
          color,
          type
        },
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
    });
  }

  deleteCategory (id: number): Promise<void> {
    return authMiddleware<void>(() => {
      const token = getAccessToken();

      return deleteRequest(`${dotenv.API_URL}/category`, {
        param: id,
        headers: {
          Authorization: token
        }
      });
    });
  }
}

export default new CategoryAPI();
