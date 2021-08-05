import { CashHistories } from '../enums/cash-history.enum';
import { CategoriesResponse } from '../types/category';
import { deleteRequest, getAccessToken, getRequest, postRequest } from './request';

// const API_URL = process.env.API_URL as string;

class CategoryAPI {
  fetchCategories (): Promise<CategoriesResponse> {
    const token = getAccessToken();

    return getRequest<CategoriesResponse>('http://localhost:8080/api/category/all', {
      headers: {
        Authorization: token
      }
    });
  }

  createCategory (value: string, color: string, type: CashHistories): Promise<void> {
    const token = getAccessToken();

    return postRequest('http://localhost:8080/api/category', {
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
  }

  deleteCategory (id: number): Promise<void> {
    const token = getAccessToken();

    return deleteRequest('http://localhost:8080/api/category', {
      param: id,
      headers: {
        Authorization: token
      }
    });
  }
}

export default new CategoryAPI();
