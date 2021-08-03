import { IsEnum, IsInt, IsNotEmpty, Length } from 'class-validator';
import { CashHistories } from '../../enums/cash-history.enum';
import BaseRequest from '../base.request';

class CashHistoryCreateRequest extends BaseRequest {
  @IsInt()
  price: number;

  @IsNotEmpty()
  @Length(1, 50)
  content: string;

  @IsEnum([
    CashHistories.Income,
    CashHistories.Expenditure
  ])
  type: CashHistories;

  @IsInt()
  categoryId: number;

  @IsInt()
  paymentId: number;

  constructor (cashHistoryCreateRequest: CashHistoryCreateRequest) {
    super();
    this.price = cashHistoryCreateRequest.price;
    this.content = cashHistoryCreateRequest.content;
    this.type = cashHistoryCreateRequest.type;
    this.categoryId = cashHistoryCreateRequest.categoryId;
    this.paymentId = cashHistoryCreateRequest.paymentId;
  }
}

export default CashHistoryCreateRequest;
