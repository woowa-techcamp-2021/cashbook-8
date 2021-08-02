import { BaseResponse } from './base-response';

export type Category = {
  id: number;
  name: string;
  color: string;
  userId: number;
}

export type CategoriesResponse = {
  categories: Category[];
} & BaseResponse;
