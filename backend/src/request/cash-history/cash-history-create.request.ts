import { IsEnum, IsInt } from 'class-validator';
import { CashHistories } from '../../enums/cash-history.enum';
import BaseRequest from '../base.request';

class CashHistoryCreateRequest extends BaseRequest {
  @IsInt()
  price: number;

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
    this.type = cashHistoryCreateRequest.type;
    this.categoryId = cashHistoryCreateRequest.categoryId;
    this.paymentId = cashHistoryCreateRequest.paymentId;
  }
}

export default CashHistoryCreateRequest;
