import { PaymentsResponse } from '../types/payment';
import { getAccessToken, getRequest } from './request';

const API_URL = process.env.API_URL as string;

class PaymentAPI {
  fetchPayments (): Promise<PaymentsResponse> {
    const token = getAccessToken();

    return getRequest<PaymentsResponse>(API_URL, {
      headers: {
        Authorization: token
      }
    });
  }
}

export default new PaymentAPI();
