import dotenv from '../../config/dotenv';
import { CashHistoriesResponse, CashHistoryRequest, CategoryExpenditureResponse } from '../types/cash-history';
import authMiddleware from './middlewares/auth.middleware';
import { getAccessToken, getRequest, postRequest, putRequest } from './request';

class CashHistoryAPI {
  async fetchCashHistories (year: number, month: number): Promise<CashHistoriesResponse> {
    return await authMiddleware(() => {
      const token = getAccessToken();

      return getRequest<CashHistoriesResponse>(`${dotenv.API_URL}/cash-history`, {
        query: {
          year,
          month
        },
        headers: {
          Authorization: token
        }
      });
    });
  }

  async getTotalCashes (year: number, month: number, categoryId: number) {
    return await authMiddleware(() => {
      const token = getAccessToken();

      return getRequest<CategoryExpenditureResponse>(`${dotenv.API_URL}/cash-history/cashes`, {
        query: {
          year,
          month,
          categoryId
        },
        headers: {
          Authorization: token
        }
      });
    });
  }

  async createCashHistory (cashHistoryRequest: CashHistoryRequest) {
    return await authMiddleware(() => {
      const token = getAccessToken();

      return postRequest<CashHistoryRequest>(`${dotenv.API_URL}/cash-history`, {
        body: cashHistoryRequest,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
    });
  }

  async updateCashHistory (id: number, cashHistoryRequest: CashHistoryRequest) {
    await authMiddleware(() => {
      const token = getAccessToken();

      return putRequest<CashHistoryRequest>(`${dotenv.API_URL}/cash-history/${id}`, {
        body: cashHistoryRequest,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
    });
  }
}

export default new CashHistoryAPI();
