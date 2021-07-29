import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import CashHistory from '../entities/cash-history';

@EntityRepository(CashHistory)
class CashHistoryRepository extends Repository<CashHistory> {
  findByUserId (userId: number): Promise<CashHistory[]> {
    return createQueryBuilder(CashHistory)
      .where('CashHistory.user_id = :userId', { userId })
      .leftJoinAndSelect('CashHistory.category', 'category')
      .leftJoinAndSelect('CashHistory.payment', 'payment')
      .orderBy({
        created_at: 'DESC'
      })
      .getMany();
  }

  findByUserIdAndDate (userId: number, year: number, month: number): Promise<CashHistory[]> {
    return createQueryBuilder(CashHistory)
      .where('CashHistory.user_id = :userId', { userId })
      .andWhere('YEAR(created_at) = :year', { year })
      .andWhere('MONTH(created_at) = :month', { month })
      .leftJoinAndSelect('CashHistory.category', 'category')
      .leftJoinAndSelect('CashHistory.payment', 'payment')
      .orderBy({
        created_at: 'DESC'
      })
      .getMany();
  }
}

export default CashHistoryRepository;
