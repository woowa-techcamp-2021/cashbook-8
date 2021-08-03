import View from '../../core/view';
import PieChartUIElement from '../../ui-elements/chart/pie-chart';
import { $ } from '../../utils/selector';
import ExpenditureInMonthViewModel from '../../view-models/expenditure-in-month';

import './index.css';

class ExpenditureInMonthView extends View {
  private expenditureInMonthViewModel: ExpenditureInMonthViewModel;

  constructor ($target: HTMLElement) {
    super($target);
    this.expenditureInMonthViewModel = new ExpenditureInMonthViewModel(this);
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    const { expenditurePieChartInput } = this.expenditureInMonthViewModel;
    this.$target.innerHTML = `
      ${expenditurePieChartInput.length <= 0
        ? '<div class="pie-chart-view--no-data">데이터가 없습니다</div>'
        : '<div class="pie-chart-view"></div>'
      }
    `;
  }

  protected mount (): void {
    const $pieChartView = $('.pie-chart-view');
    if ($pieChartView !== null) {
      new PieChartUIElement(this.$target, this.expenditureInMonthViewModel.expenditurePieChartInput, 600, 600).build();
    }
  }
}

export default ExpenditureInMonthView;
