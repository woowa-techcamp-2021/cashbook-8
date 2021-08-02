import { BaseResponse } from './base-response';

export type Payment = {
  id: number;
  name: string;
  userId: number;
}

export type PaymentsResponse = {
  payments: Payment[];
} & BaseResponse;
