import { IsNotEmpty, Length, Matches } from 'class-validator';
import BaseRequest from '../base.request';

class CategoryCreateRequest extends BaseRequest {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @Matches(/^#(?:[0-9a-f]{3}){1,2}$/i)
  color: string;

  constructor (categoryCreateReqeust: CategoryCreateRequest) {
    super();
    this.name = categoryCreateReqeust.name;
    this.color = categoryCreateReqeust.color;
  }
}
export default CategoryCreateRequest;
