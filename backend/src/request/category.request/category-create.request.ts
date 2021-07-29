import BaseRequest from '../base.request';

class CategoryCreateRequest extends BaseRequest {
  // TODO: validation 설정하기.. 뭐해야할지 몰라서 비워둠
  name: string;

  color: string;

  constructor (categoryCreateReqeust: CategoryCreateRequest) {
    super();
    this.name = categoryCreateReqeust.name;
    this.color = categoryCreateReqeust.color;
  }
}
export default CategoryCreateRequest;
