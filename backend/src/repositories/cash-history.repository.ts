import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import CashHistory from '../entities/cash-history';
import { CashHistories } from '../enums/cash-history.enum';

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

  getTotalCashesByCategoryAndDate (userId: number, year: number, month: number, categoryId: number): Promise<{ month: number, price: number }[]> {
    return createQueryBuilder(CashHistory)
      .select('MONTH(created_at) as month, SUM(price) as price')
      .where('user_id = :userId', { userId })
      .andWhere('type = :type', { type: CashHistories.Expenditure.toString() })
      .andWhere('category_id = :categoryId', { categoryId })
      .andWhere('(YEAR(created_at) = :year AND MONTH(created_at) <= :month OR YEAR(created_at) = :lastYear AND MONTH(created_at) > :month)', { year, month, lastYear: year - 1 })
      .groupBy('MONTH(created_at)')
      .getRawMany();
  }
}

export default CashHistoryRepository;
