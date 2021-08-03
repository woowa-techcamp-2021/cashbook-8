import { IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';
import { CashHistories } from '../../enums/cash-history.enum';
import BaseRequest from '../base.request';

class CategoryCreateRequest extends BaseRequest {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @Matches(/^#(?:[0-9a-f]{3}){1,2}$/i)
  color: string;

  @IsEnum(CashHistories)
  type: CashHistories;

  constructor (categoryCreateRequest: CategoryCreateRequest) {
    super();
    this.name = categoryCreateRequest.name;
    this.color = categoryCreateRequest.color;
    this.type = categoryCreateRequest.type;
  }
}
export default CategoryCreateRequest;
