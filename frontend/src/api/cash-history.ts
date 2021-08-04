import { CashHistoriesResponse, CashHistoryRequest } from '../types/cash-history';
import { getAccessToken, getRequest, postRequest, putRequest } from './request';

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

  createCashHistory (cashHistoryRequest: CashHistoryRequest) {
    const token = getAccessToken();

    postRequest<CashHistoryRequest>('http://localhost:8080/api/cash-history', {
      body: cashHistoryRequest,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });
  }

  updateCashHistory (id: number, cashHistoryRequest: CashHistoryRequest) {
    const token = getAccessToken();

    putRequest<CashHistoryRequest>(`http://localhost:8080/api/cash-history/${id}`, {
      body: cashHistoryRequest,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });
  }
}

export default new CashHistoryAPI();
