import { IsNumber } from 'class-validator';
import BaseRequest from '../base.request';

class CategoryDeleteRequest extends BaseRequest {
  @IsNumber()
  id: number;

  constructor (id: number) {
    super();
    this.id = id;
  }
}

export default CategoryDeleteRequest;
