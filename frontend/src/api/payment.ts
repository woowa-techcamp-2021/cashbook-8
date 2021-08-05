import dotenv from '../../config/dotenv';
import { PaymentsResponse } from '../types/payment';
import authMiddleware from './middlewares/auth.middleware';
import { deleteRequest, getAccessToken, getRequest, postRequest } from './request';

class PaymentAPI {
  fetchPayments (): Promise<PaymentsResponse> {
    return authMiddleware<PaymentsResponse>(() => {
      const token = getAccessToken();

      return getRequest<PaymentsResponse>(`${dotenv.API_URL}/payment/all`, {
        headers: {
          Authorization: token
        }
      });
    });
  }

  createPayment (value: string): Promise<void> {
    return authMiddleware(() => {
      const token = getAccessToken();

      return postRequest(`${dotenv.API_URL}/payment`, {
        body: {
          name: value
        },
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
    });
  }

  deletePayment (id: number): Promise<void> {
    return authMiddleware(() => {
      const token = getAccessToken();

      return authMiddleware(() => deleteRequest(`${dotenv.API_URL}/payment`, {
        param: id,
        headers: {
          Authorization: token
        }
      }));
    });
  }
}

export default new PaymentAPI();
