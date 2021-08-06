import { IsInt, IsNotEmpty, Length, Matches } from 'class-validator';
import BaseRequest from '../base.request';

class CashHistoryUpdateRequest extends BaseRequest {
  @IsInt()
  price: number;

  @IsNotEmpty()
  @Length(1, 50)
  content: string;

  @IsInt()
  categoryId: number;

  @IsInt()
  paymentId: number;

  // yyyyMMdd
  @Matches(/^([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))$/)
  date!: string;

  constructor (cashHistoryCreateRequest: CashHistoryUpdateRequest) {
    super();
    this.price = cashHistoryCreateRequest.price;
    this.content = cashHistoryCreateRequest.content;
    this.categoryId = cashHistoryCreateRequest.categoryId;
    this.paymentId = cashHistoryCreateRequest.paymentId;
    this.date = cashHistoryCreateRequest.date;
  }
}

export default CashHistoryUpdateRequest;
