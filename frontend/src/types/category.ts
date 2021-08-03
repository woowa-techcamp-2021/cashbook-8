import { CashHistories } from '../enums/cash-history.enum';
import { BaseResponse } from './base-response';

export type Category = {
  id: number;
  name: string;
  color: string;
  userId: number;
  type: CashHistories;
}

export type CategoriesResponse = {
  categories: Category[];
} & BaseResponse;
