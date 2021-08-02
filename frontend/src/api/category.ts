import { CategoriesResponse } from '../types/category';
import { getAccessToken, getRequest } from './request';

const API_URL = process.env.API_URL as string;

class CategoryAPI {
  fetchCategories (): Promise<CategoriesResponse> {
    const token = getAccessToken();

    return getRequest<CategoriesResponse>(API_URL, {
      headers: {
        Authorization: token
      }
    });
  }
}

export default new CategoryAPI();
