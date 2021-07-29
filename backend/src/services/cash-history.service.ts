import { getCustomRepository } from 'typeorm';
import CashHistory from '../entities/cash-history';
import User from '../entities/user';
import CashHistoryRepository from '../repositories/cash-history.repository';

class CashHistoryService {
  async findCashHistories (user: User): Promise<CashHistory[]> {
    const { id } = user;
    const cashHistories = await getCustomRepository(CashHistoryRepository)
      .findByUserId(id);

    return cashHistories;
  }

  async findCashHistoriesByDate (user: User, year: number, month: number): Promise<CashHistory[]> {
    const { id } = user;
    const cashHistories = await getCustomRepository(CashHistoryRepository)
      .findByUserIdAndDate(id, year, month);

    return cashHistories;
  }
}

export default new CashHistoryService();
