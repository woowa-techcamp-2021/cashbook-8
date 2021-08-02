import View from '../../core/view';
import { CashHistoriesInDay } from '../../types/cash-history';
import CashHistoryListViewModel from '../../view-models/cash-history-list';

class CashHistoryListView extends View {
  private cashHistoryListViewModel: CashHistoryListViewModel;

  constructor ($target: HTMLElement) {
    super($target);
    this.cashHistoryListViewModel = new CashHistoryListViewModel(this);
  }

  makeTemplate (cashHistory: CashHistoriesInDay): string {
    return `
      <div>
        <div>${cashHistory.month}</div>
        <div>${cashHistory.date}</div>
        <div>수입 ${cashHistory.income}</div>
        <div>지출 ${cashHistory.expenditure}</div>
        <div>${cashHistory.cashHistories}</div>
      </div>
    `;
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    this.$target.innerHTML = `
      <div>${this.cashHistoryListViewModel.cashHistories?.map(cashHistory => {
        return this.makeTemplate(cashHistory);
      })}<div>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default CashHistoryListView;
