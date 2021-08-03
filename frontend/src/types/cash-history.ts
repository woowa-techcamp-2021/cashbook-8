import { BaseResponse } from './base-response';
import { Category } from './category';
import { Payment } from './payment';

export type CashHistory = {
  id: number;
  price: number;
  content: string;
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
  income: number;
  expenditure: number;
}

export type CashHistoriesResponse = {
  cashHistories: {
    totalIncome: number;
    totalExpenditure: number;
    groupedCashHistories: CashHistoriesInDay[];
  }
} & BaseResponse;
