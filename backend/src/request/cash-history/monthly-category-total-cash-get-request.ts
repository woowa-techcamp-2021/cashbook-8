import { IsInt, Matches, Max, Min } from 'class-validator';
import BaseRequest from '../base.request';

class MonthlyCategoryTotalCashGetRequest extends BaseRequest {
  @Matches(/\d{4}/)
  year: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  categoryId: number;

  constructor (monthlyCategoryTotalCashGetRequest: MonthlyCategoryTotalCashGetRequest) {
    super();
    this.year = monthlyCategoryTotalCashGetRequest.year;
    this.month = Number(monthlyCategoryTotalCashGetRequest.month);
    this.categoryId = Number(monthlyCategoryTotalCashGetRequest.categoryId);
  }
}

export default MonthlyCategoryTotalCashGetRequest;
