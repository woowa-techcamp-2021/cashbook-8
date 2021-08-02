import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { CashHistoriesData } from '../models/cash-histories';
import { CashHistoriesInDay } from '../types/cash-history';

class CashHistoryListViewModel extends ViewModel {
  private cashHistoriesModel: CashHistoriesData;

  constructor (view: View) {
    super(view);
    this.cashHistoriesModel = models.cashHistories;
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_CASH_HISTORY_CHANGE, () => {
      this.view.build();
    });
  }

  get cashHistories (): CashHistoriesInDay[] | undefined {
    return this.cashHistoriesModel.cashHistories?.cashHistories.groupedCashHistories;
  }
}

export default CashHistoryListViewModel;
