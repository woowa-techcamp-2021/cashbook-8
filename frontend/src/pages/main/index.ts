import Page from '../../core/page';
import { $ } from '../../utils/selector';
import CashHistoryCountView from '../../views/cash-history-count';
import CashHistoryListView from '../../views/cash-history-list';
import FilterBoxView from '../../views/filter-box';
import HeaderView from '../../views/header';

class MainPage extends Page {
  protected mount (): void {
    const headerView = new HeaderView(this.$target);
    const cashHistoryCountView = new CashHistoryCountView(this.$target);
    const filterBoxViewIncome = new FilterBoxView(this.$target, '수입');
    const filterBoxViewExpenditure = new FilterBoxView(this.$target, '지출');
    const cashHistoryListView = new CashHistoryListView(this.$target);

    // headerView.build();
    // cashHistoryCountView.build();
    // filterBoxViewIncome.build();
    // filterBoxViewExpenditure.build();

    // $('#headerView')?.append(headerView);
  }

  protected render ():void {
    this.$target.innerHTML = `
      <div>
        <div id="headerView"></div>
        <div id="cashHistoryCountView"></div>
        <div id="filterBoxViewIncome"></div>
        <div id="filterBoxViewExpenditure"></div>
      </div>
    `;
  }
}

export default MainPage;
