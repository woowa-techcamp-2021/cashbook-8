import { getCustomRepository } from 'typeorm';
import Payment from '../entities/payment';
import User from '../entities/user';
import DuplicatePaymentError from '../errors/duplicate-payment.error';
import NotMyPaymentError from '../errors/not-my-payment.error';
import NotfoundPaymentError from '../errors/notfound-payment.error';
import PaymentRepository from '../repositories/payment.repository';
import Builder from '../utils/builder';

class PaymentService {
  async findPayments (user: User): Promise<Payment[]> {
    const payments = await getCustomRepository(PaymentRepository).findAllByUserId(user.id);
    return payments;
  }

  async createPayment (payment: Payment, user: User): Promise<void> {
    const newPayment = Builder<Payment>()
      .name(payment.name)
      .user(user)
      .build();

    const duplicatedPayment = await getCustomRepository(PaymentRepository).findByUserAndName(user.id, newPayment.name);
    if (duplicatedPayment !== undefined) {
      throw new DuplicatePaymentError('해당 결제수단이 이미 존재합니다');
    }
    await getCustomRepository(PaymentRepository).save(newPayment);
  }

  async deletePayment (id: number, user: User): Promise<void> {
    const payment = await getCustomRepository(PaymentRepository).findOne(id);

    if (payment === undefined) {
      throw new NotfoundPaymentError('존재하지 않는 결제수단입니다');
    }

    if (payment.userId !== user.id) {
      throw new NotMyPaymentError('삭제 권한이 없습니다');
    }

    await getCustomRepository(PaymentRepository).delete(id);
  }
}

export default new PaymentService();
