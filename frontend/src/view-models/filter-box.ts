import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { CashHistoriesData } from '../models/cash-histories';

class FilterBoxViewModel extends ViewModel {
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

  getTotalPrice (label: string): number {
    const cashHistories = this.cashHistoriesModel.cashHistories;

    if (cashHistories === null) {
      return 0;
    }

    if (label === '수입') {
      return cashHistories.cashHistories.totalIncome;
    } else {
      return cashHistories.cashHistories.totalExpenditure;
    }
  }
}

export default FilterBoxViewModel;
