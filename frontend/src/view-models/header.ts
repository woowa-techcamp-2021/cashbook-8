import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { FocusDateData } from '../models/focus-date';
import cashHistoryAPI from '../api/cash-history';
import { CashHistoriesData } from '../models/cash-histories';

class HeaderViewModel extends ViewModel {
  private focusDateModel: FocusDateData;
  private cashHistoriesModel: CashHistoriesData;

  constructor (view: View) {
    super(view);
    this.focusDateModel = models.focusDate;
    this.cashHistoriesModel = models.cashHistories;
    this.fetchCashHistories();
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_FOCUS_DATE_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_CASH_HISTORY_CHANGE, () => {
      this.view.build();
    });
  }

  async fetchCashHistories (): Promise<void> {
    const date = this.focusDateModel.focusDate;
    setTimeout(async () => {
      const histories = await cashHistoryAPI.fetchCashHistories(date.getFullYear(), date.getMonth());
      this.cashHistoriesModel.cashHistories = histories;
    }, 3000);
  }

  get formatTime (): string {
    const time = this.focusDateModel.focusDate;

    return time.toString();
  }

  get cashHistories (): string | undefined {
    return this.cashHistoriesModel.cashHistories?.message;
  }

  onNextMonthClicked (): void {
    this.focusDateModel.focusDate = new Date(2021, 9, 27);
  }

  onPreviousMonthClicked (): void {
    this.focusDateModel.focusDate = new Date(2021, 7, 27);
  }
}

export default HeaderViewModel;
