import { BaseResponse } from './base-response';
import { Category } from './category';
import { Payment } from './payment';

export type CashHistory = {
  id: number;
  price: number;
  type: number;
  createdAt: string;
  category: Category;
  payment: Payment;
  userId: number;
  categoryId: number
  paymentId: number;
}

export type CashHistoriesInDay = {
  year: number;
  month: number;
  date: number;
  day: number;
  cashHistories: CashHistory[];
}

export type CashHistoriesResponse = {
  totalIncome: number;
  totalExpenditure: number;
  cashHistories: CashHistoriesInDay[];
} & BaseResponse;
