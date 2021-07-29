import { IsInt, Matches, Max, Min } from 'class-validator';
import BaseRequest from '../base.request';

class CashHistoryFindRequest extends BaseRequest {
  @Matches(/\d{4}/)
  year: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  constructor (cashHistoryFindRequest: CashHistoryFindRequest) {
    super();
    this.year = cashHistoryFindRequest.year;
    this.month = Number(cashHistoryFindRequest.month);
  }
}

export default CashHistoryFindRequest;
