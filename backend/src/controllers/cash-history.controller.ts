import { Request, Response } from 'express';
import CashHistory from '../entities/cash-history';
import CashHistoryFindRequest from '../request/cash-history/cash-history-find.request';
import cashHistoryService from '../services/cash-history.service';
import isNotNone from '../utils/validation/isNotNone';

class CashHistoryController {
  async findCashHistories (req: Request, res: Response) {
    const { user, query } = req;
    let cashHistories: CashHistory[] = [];

    if (isNotNone(query.year) || isNotNone(query.month)) {
      const cashHistoryFindRequest = new CashHistoryFindRequest(query as unknown as CashHistoryFindRequest);
      await cashHistoryFindRequest.validate();
      const { year, month } = cashHistoryFindRequest;

      cashHistories = await cashHistoryService.findCashHistoriesByDate(user, year, month);
    } else {
      cashHistories = await cashHistoryService.findCashHistories(user);
    }

    res.status(200).json({
      message: '가계 내역 조회에 성공했습니다',
      cashHistories
    });
  }
}

export default new CashHistoryController();
