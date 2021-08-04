import Page from '../../core/page';
import { $ } from '../../utils/selector';
import ExpenditureInMonthView from '../../views/expenditure-in-month';
import HeaderView from '../../views/header';

class ChartPage extends Page {
  protected render (): void {
    this.$target.innerHTML = `
      <div class="chart-page">
        <div class="header-container"></div>
        <div class="expenditure-in-month-container"></div>
      </div>
    `;
  }

  protected mount (): void {
    const $headerContainer = $('.header-container');
    if ($headerContainer !== null) {
      const headerView = new HeaderView($headerContainer);
      headerView.build();
    }

    const $expenditureInMonthContainer = $('.expenditure-in-month-container');
    if ($expenditureInMonthContainer !== null) {
      const expenditureInMonthView = new ExpenditureInMonthView($expenditureInMonthContainer);
      expenditureInMonthView.build();
    }
  }
}

export default ChartPage;
