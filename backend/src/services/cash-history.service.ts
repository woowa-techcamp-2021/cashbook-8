import { getCustomRepository } from 'typeorm';
import CashHistory from '../entities/cash-history';
import User from '../entities/user';
import NotfoundCashHistoryError from '../errors/notfound-cash-history.error';
import NotMyCashHistoryError from '../errors/not-my-cash-history.error';
import NotfoundCategoryError from '../errors/notfound-category.error';
import NotfoundPaymentError from '../errors/notfound-payment.error';
import CashHistoryRepository from '../repositories/cash-history.repository';
import CategoryRepository from '../repositories/category.repository';
import PaymentRepository from '../repositories/payment.repository';
import CashHistoryCreateRequest from '../request/cash-history/cash-history-create.request';
import CashHistoryUpdateRequest from '../request/cash-history/cash-history-update.request';
import Builder from '../utils/builder';
import { getDaysInMonth, yyyyMMdd2Date } from '../utils/date';
import { CashHistories } from '../enums/cash-history.enum';

type GroupedCashHistory = {
  year: number,
  month: number,
  date: number,
  day: number,
  cashHistories: CashHistory[],
  income: number;
  expenditure: number;
}

class CashHistoryService {
  groupCashHistories (year: number, month: number, cashHistories: CashHistory[]) {
    const daysInMonth = getDaysInMonth(year, month);
    const groupedCashHistories: GroupedCashHistory[] = [];
    for (let i = 0; i < daysInMonth; i += 1) {
      const date = i + 1;
      const day = new Date(year, month - 1, date).getDay();

      groupedCashHistories.push({
        year,
        month,
        date,
        day,
        cashHistories: [],
        income: 0,
        expenditure: 0
      });
    }

    let totalIncome = 0;
    let totalExpenditure = 0;
    cashHistories.forEach((cashHistory) => {
      const date = cashHistory.createdAt.getDate();
      groupedCashHistories[date - 1].cashHistories.push(cashHistory);
      if (cashHistory.type === CashHistories.Income) {
        totalIncome += cashHistory.price;
        groupedCashHistories[date - 1].income += cashHistory.price;
      } else {
        totalExpenditure += cashHistory.price;
        groupedCashHistories[date - 1].expenditure += cashHistory.price;
      }
    });

    return {
      totalIncome,
      totalExpenditure,
      groupedCashHistories
    };
  }

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

  async getMonthlyCategoryTotalCash (user: User, year: number, month: number, categoryId: number) {
    const { id } = user;
    const totalCashes = await getCustomRepository(CashHistoryRepository)
      .getTotalCashesByCategoryAndDate(id, year, month, categoryId);

    return totalCashes;
  }

  pushZeroPrice2Null (month: number, totalCashes: { month: number, price: number }[]) {
    const formattedTotalCashes = [];
    for (let i = 0; i < 12; i++) {
      formattedTotalCashes.push({ month: 0, price: 0 });
    }
    const GAP = 12 - month;
    totalCashes.forEach(totalCash => {
      if (totalCash.month <= month) {
        formattedTotalCashes[totalCash.month + GAP - 1] = {
          month: totalCash.month,
          price: Number(totalCash.price)
        };
      } else {
        formattedTotalCashes[totalCash.month - month - 1] = {
          month: totalCash.month,
          price: Number(totalCash.price)
        };
      }
    });
    let i = month + 1;
    formattedTotalCashes.forEach(totalCashes => {
      let ii = i++ % 13;
      if (ii === 0) {
        ii++;
        i++;
      }
      totalCashes.month = ii;
    });
    return formattedTotalCashes;
  }

  async createCashHistory (user: User, cashHistoryCreateRequest: CashHistoryCreateRequest) {
    const { id } = user;
    const { price, content, categoryId, paymentId, date } = cashHistoryCreateRequest;
    const category = await getCustomRepository(CategoryRepository).findOne(categoryId);
    const payment = await getCustomRepository(PaymentRepository).findOne(paymentId);

    if (category === undefined || category.userId !== id) {
      throw new NotfoundCategoryError('해당 카테고리가 없습니다');
    }

    if (payment === undefined || payment.userId !== id) {
      throw new NotfoundPaymentError('해당 결제수단이 없습니다');
    }

    const cashHistory = Builder<CashHistory>()
      .price(price)
      .content(content)
      .type(category.type)
      .category(category)
      .payment(payment)
      .user(user)
      .createdAt(yyyyMMdd2Date(date))
      .build();

    await getCustomRepository(CashHistoryRepository).insert(cashHistory);
  }

  async updateCashHistory (user: User, cashHistoryId: number, cashHistoryUpdateRequest: CashHistoryUpdateRequest) {
    const { id } = user;
    const { price, content, categoryId, paymentId, date } = cashHistoryUpdateRequest;
    const category = await getCustomRepository(CategoryRepository).findOne(categoryId);
    const payment = await getCustomRepository(PaymentRepository).findOne(paymentId);

    const cashHistory = await getCustomRepository(CashHistoryRepository).findOne(cashHistoryId);
    if (cashHistory === undefined) {
      throw new NotfoundCashHistoryError('가계 내역이 존재하지 않습니다');
    }

    if (cashHistory.userId !== id) {
      throw new NotMyCashHistoryError('본인의 가계내역만 수정할 수 있습니다');
    }

    if (category === undefined || category.userId !== id) {
      throw new NotfoundCategoryError('해당 카테고리가 없습니다');
    }

    if (payment === undefined || payment.userId !== id) {
      throw new NotfoundPaymentError('해당 결제수단이 없습니다');
    }

    const updateCashHistory = Builder<CashHistory>()
      .price(price)
      .content(content)
      .type(category.type)
      .category(category)
      .payment(payment)
      .createdAt(yyyyMMdd2Date(date))
      .build();

    await getCustomRepository(CashHistoryRepository).update(cashHistoryId, updateCashHistory);
  }

  async deleteCashHistory (user: User, id: number): Promise<void> {
    const cashHistory = await getCustomRepository(CashHistoryRepository).findOne(id);
    if (cashHistory === undefined) {
      throw new NotfoundCashHistoryError('가계 내역이 없습니다');
    }

    if (cashHistory.userId !== user.id) {
      throw new NotMyCashHistoryError('본인의 가계만 삭제할 수 있습니다');
    }

    await getCustomRepository(CashHistoryRepository).delete(cashHistory.id);
  }
}

export default new CashHistoryService();
