import User from '../../entities/user';
import BaseRequest from '../base.request';

class CategoryCreateRequest extends BaseRequest {
  // TODO: validation 설정하기.. 뭐해야할지 몰라서 비워둠
  name: string;

  color: string;

  user: User;

  constructor (name: string, color: string, user: User) {
    super();
    this.name = name;
    this.color = color;
    this.user = user;
  }
}
export default CategoryCreateRequest;
