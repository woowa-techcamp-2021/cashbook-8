import { CashHistories } from '../enums/cash-history.enum';
import { BaseResponse } from './base-response';
import { Category } from './category';
import { Payment } from './payment';

export type CashHistory = {
  id: number;
  price: number;
  content: string;
  type: CashHistories;
  createdAt: string;
  category: Category | null;
  payment: Payment | null;
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

export type TotalPrices = {
  totalPrice: number;
  totalExpenditure: number;
  totalIncome: number;
}

export type CashHistoryRequest = {
  date: string;
  categoryId: number;
  content: string;
  paymentId: number;
  price: number;
}

export type TotalCash = {
  month: number;
  price: number;
}

export type CategoryExpenditureResponse = {
  totalCashes: TotalCash[]
} & BaseResponse;
