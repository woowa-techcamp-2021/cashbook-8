import { IsNotEmpty, Length } from 'class-validator';
import BaseRequest from '../base.request';

class CategoryCreateRequest extends BaseRequest {
  @IsNotEmpty()
  name: string;

  @Length(1, 50)
  color: string;

  constructor (categoryCreateReqeust: CategoryCreateRequest) {
    super();
    this.name = categoryCreateReqeust.name;
    this.color = categoryCreateReqeust.color;
  }
}
export default CategoryCreateRequest;
