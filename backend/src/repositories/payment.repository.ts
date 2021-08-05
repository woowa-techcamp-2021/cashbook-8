import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Payment from '../entities/payment';

@EntityRepository(Payment)
class PaymentRepository extends Repository<Payment> {
  findAllByUserId (userId: number): Promise<Payment[]> {
    return createQueryBuilder(Payment)
      .where('user_id = :userId', { userId })
      .getMany();
  }

  findByUserAndName (userId: number, name: string): Promise<Payment | undefined> {
    return createQueryBuilder(Payment)
      .where('user_id = :userId', { userId })
      .andWhere('name = :name', { name })
      .getOne();
  }
}

export default PaymentRepository;
