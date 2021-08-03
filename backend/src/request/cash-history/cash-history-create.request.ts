import { IsInt, IsNotEmpty, Length } from 'class-validator';
import BaseRequest from '../base.request';

class CashHistoryCreateRequest extends BaseRequest {
  @IsInt()
  price: number;

  @IsNotEmpty()
  @Length(1, 50)
  content: string;

  @IsInt()
  categoryId: number;

  @IsInt()
  paymentId: number;

  constructor (cashHistoryCreateRequest: CashHistoryCreateRequest) {
    super();
    this.price = cashHistoryCreateRequest.price;
    this.content = cashHistoryCreateRequest.content;
    this.categoryId = cashHistoryCreateRequest.categoryId;
    this.paymentId = cashHistoryCreateRequest.paymentId;
  }
}

export default CashHistoryCreateRequest;
