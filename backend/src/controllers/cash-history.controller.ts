import { Request, Response } from 'express';
import InvalidDataError from '../errors/invalid-data.error';
import CashHistoryCreateRequest from '../request/cash-history/cash-history-create.request';
import CashHistoryFindRequest from '../request/cash-history/cash-history-find.request';
import CashHistoryUpdateRequest from '../request/cash-history/cash-history-update.request';
import MonthlyCategoryTotalCashGetRequest from '../request/cash-history/monthly-category-total-cash-get-request';
import cashHistoryService from '../services/cash-history.service';
import isNumberString from '../utils/validation/isNumberString';

class CashHistoryController {
  async findCalendarCashHistories (req: Request, res: Response) {
    const { user, query } = req;

    const cashHistoryFindRequest = new CashHistoryFindRequest(query as unknown as CashHistoryFindRequest);
    await cashHistoryFindRequest.validate();
    const { year, month } = cashHistoryFindRequest;

    const cashHistories = await cashHistoryService.findCashHistoriesByDate(user, year, month);
    const groupedCashHistories = cashHistoryService.groupCashHistories(year, month, cashHistories);

    res.status(200).json({
      message: '가계 내역 조회에 성공했습니다',
      cashHistories: groupedCashHistories
    });
  }

  async getMonthlyCategoryTotalCash (req: Request, res: Response) {
    const { user, query } = req;

    const monthlyCategoryTotalCashGetRequest = new MonthlyCategoryTotalCashGetRequest(query as unknown as MonthlyCategoryTotalCashGetRequest);
    await monthlyCategoryTotalCashGetRequest.validate();
    const { year, month, categoryId } = monthlyCategoryTotalCashGetRequest;

    const totalCashes = await cashHistoryService.getMonthlyCategoryTotalCash(user, year, month, categoryId);

    res.status(200).json({
      message: '카테고리 소비 추이 조회에 성공했습니다',
      totalCashes: totalCashes
    });
  }

  async createCashHistory (req: Request, res: Response) {
    const { user, body } = req;

    const cashHistoryCreateRequest = new CashHistoryCreateRequest(body);
    await cashHistoryCreateRequest.validate();

    await cashHistoryService.createCashHistory(user, cashHistoryCreateRequest);

    res.status(200).json({
      message: '가계 내역 생성에 성공했습니다'
    });
  }

  async updateCashHistory (req: Request, res: Response) {
    const { user, body, params } = req;
    if (!isNumberString(params.id)) {
      throw new InvalidDataError('가계 내역 번호가 옳지 않습니다');
    }

    const cashHistoryUpdateRequest = new CashHistoryUpdateRequest(body);
    await cashHistoryUpdateRequest.validate();

    await cashHistoryService.updateCashHistory(user, Number(params.id), cashHistoryUpdateRequest);

    res.status(200).json({
      message: '가계 내역 수정에 성공했습니다'
    });
  }

  async deleteCashHistory (req: Request, res: Response) {
    const { user, params } = req;
    if (!isNumberString(params.id)) {
      throw new InvalidDataError('가계 내역 번호가 옳지 않습니다');
    }

    await cashHistoryService.deleteCashHistory(user, Number(params.id));

    res.status(200).json({
      message: '가계 내역 삭제에 성공했습니다'
    });
  }
}

export default new CashHistoryController();
