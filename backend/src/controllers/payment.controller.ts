import { Request, Response } from 'express';
import InvalidDataError from '../errors/invalid-data.error';
import PaymentCreateRequest from '../request/payment.request/payment-create.request';
import paymentService from '../services/payment.service';
import isNumberString from '../utils/validation/isNumberString';

class PaymentController {
  async findPayments (req: Request, res: Response) {
    const { user } = req;

    const payments = await paymentService.findPayments(user);

    res.status(200).json({
      message: '결제수단 조회에 성공했습니다',
      payments
    });
  }

  async createPayment (req: Request, res: Response) {
    const { user } = req;

    const payment = req.body;
    const paymentCreateRequest = new PaymentCreateRequest(payment);
    await paymentCreateRequest.validate();

    await paymentService.createPayment(payment, user);

    res.status(200).json({
      message: '결제수단이 생성되었습니다'
    });
  }

  async deletePayment (req: Request, res: Response) {
    const { id } = req.params;

    if (!isNumberString(id)) {
      throw new InvalidDataError('결제수단 아이디 타입이 올바르지 않습니다');
    }

    await paymentService.deletePayment(Number(id));

    res.status(200).json({
      message: `${id}번 결제수단이 삭제되었습니다`
    });
  }
}

export default new PaymentController();
