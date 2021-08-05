import { PaymentsResponse } from '../types/payment';
import { getAccessToken, getRequest } from './request';

// const API_URL = process.env.API_URL as string;

class PaymentAPI {
  fetchPayments (): Promise<PaymentsResponse> {
    const token = getAccessToken();

    return getRequest<PaymentsResponse>('http://localhost:8080/api/payment/all', {
      headers: {
        Authorization: token
      }
    });
  }
}

export default new PaymentAPI();
