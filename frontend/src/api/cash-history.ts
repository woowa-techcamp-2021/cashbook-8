import dotenv from '../../config/dotenv';
import { CashHistoriesResponse, CashHistoryRequest, CategoryExpenditureResponse } from '../types/cash-history';
import { getAccessToken, getRequest, postRequest, putRequest } from './request';

class CashHistoryAPI {
  fetchCashHistories (year: number, month: number): Promise<CashHistoriesResponse> {
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
  }

  getTotalCashes (year: number, month: number, categoryId: number) {
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
  }

  createCashHistory (cashHistoryRequest: CashHistoryRequest) {
    const token = getAccessToken();

    postRequest<CashHistoryRequest>(`${dotenv.API_URL}/cash-history`, {
      body: cashHistoryRequest,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });
  }

  updateCashHistory (id: number, cashHistoryRequest: CashHistoryRequest) {
    const token = getAccessToken();

    putRequest<CashHistoryRequest>(`${dotenv.API_URL}/cash-history/${id}`, {
      body: cashHistoryRequest,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });
  }
}

export default new CashHistoryAPI();
