import View from '../../core/view';
import CashHistoryCountViewModel from '../../view-models/cash-history-count';

class CashHistoryCountView extends View {
  private cashHistoryCountViewModel: CashHistoryCountViewModel;

  constructor ($target: HTMLElement) {
    super($target);
    this.cashHistoryCountViewModel = new CashHistoryCountViewModel(this);
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    this.$target.innerHTML = `
      <div>전체 내역 ${this.cashHistoryCountViewModel.getCashHistoryCount()}건<div>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default CashHistoryCountView;
