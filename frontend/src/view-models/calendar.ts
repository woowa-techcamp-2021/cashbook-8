import cashHistoryAPI from '../api/cash-history';
import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { CashHistoriesData } from '../models/cash-histories';
import { FocusDateData } from '../models/focus-date';
import { CashHistoriesInDay, TotalPrices } from '../types/cash-history';
import toast from '../utils/toast/toast';

class CalendarViewModel extends ViewModel {
  private cashHistoriesModel: CashHistoriesData;
  private focusDateModel: FocusDateData;

  constructor (view: View) {
    super(view);
    this.cashHistoriesModel = models.cashHistories;
    this.focusDateModel = models.focusDate;
    this.fetchCashHistories();
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_FOCUS_DATE_CHANGE, () => {
      this.fetchCashHistories();
    });

    pubsub.subscribe(actions.ON_CASH_HISTORIES_CHANGE, () => {
      this.view.build();
    });
  }

  private async fetchCashHistories () {
    const { focusDate } = this.focusDateModel;
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth() + 1;

    try {
      const cashHistories = await cashHistoryAPI.fetchCashHistories(year, month);
      this.cashHistoriesModel.cashHistories = cashHistories;
    } catch (error) {
      const { status } = error;

      if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  get monthlyCashHistories (): CashHistoriesInDay[] | undefined {
    return this.cashHistoriesModel.cashHistories?.cashHistories.groupedCashHistories;
  }

  get totalPrices (): TotalPrices {
    const { cashHistories } = this.cashHistoriesModel;
    const totalIncome = cashHistories?.cashHistories.totalIncome ?? 0;
    const totalExpenditure = cashHistories?.cashHistories.totalExpenditure ?? 0;

    return {
      totalIncome,
      totalExpenditure,
      totalPrice: totalIncome - totalExpenditure
    };
  }
}
export default CalendarViewModel;
