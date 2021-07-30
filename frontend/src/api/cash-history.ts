import { CashHistoriesResponse } from '../types/cash-history';
import { getAccessToken, getRequest } from './request';

class CashHistoryAPI {
  fetchCashHistories (year: number, month: number): Promise<CashHistoriesResponse> {
    const token = getAccessToken();

    return getRequest<CashHistoriesResponse>('http://localhost:8080/api/cash-history', {
      query: {
        year,
        month
      },
      headers: {
        Authorization: token
      }
    });
  }
}

export default new CashHistoryAPI();
