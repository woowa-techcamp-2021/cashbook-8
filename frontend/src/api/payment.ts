import { PaymentsResponse } from '../types/payment';
import { deleteRequest, getAccessToken, getRequest, postRequest } from './request';

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

  createPayment (value: string): Promise<void> {
    const token = getAccessToken();

    return postRequest('http://localhost:8080/api/payment', {
      body: {
        name: value
      },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });
  }

  deletePayment (id: number): Promise<void> {
    const token = getAccessToken();

    return deleteRequest('http://localhost:8080/api/payment', {
      param: id,
      headers: {
        Authorization: token
      }
    });
  }
}

export default new PaymentAPI();
