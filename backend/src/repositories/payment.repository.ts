import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Payment from '../entities/payment';

@EntityRepository(Payment)
class PaymentRepository extends Repository<Payment> {
  findAllByUserId (userId: number): Promise<Payment[]> {
    return createQueryBuilder(Payment)
      .where('user_id = :userId', { userId })
      .getMany();
  }

  findByName (name: string): Promise<Payment | undefined> {
    return createQueryBuilder(Payment)
      .where({
        name
      })
      .getOne();
  }
}

export default PaymentRepository;
