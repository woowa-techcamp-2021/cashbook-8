import { IsNotEmpty, Length } from 'class-validator';
import BaseRequest from '../base.request';

class PaymentCreateRequest extends BaseRequest {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  constructor (paymentCreateReauest: PaymentCreateRequest) {
    super();
    this.name = paymentCreateReauest.name;
  }
}

export default PaymentCreateRequest;
