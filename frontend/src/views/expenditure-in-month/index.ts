import View from '../../core/view';
import PieChartUIElement from '../../ui-elements/chart/pie-chart';
import ExpenditureListUIElement from '../../ui-elements/expenditure/expenditure-list';
import { $ } from '../../utils/selector';
import ExpenditureInMonthViewModel from '../../view-models/expenditure-in-month';

import './index.css';

class ExpenditureInMonthView extends View {
  private expenditureInMonthViewModel: ExpenditureInMonthViewModel;
  private pieChartUIElement?: PieChartUIElement;

  constructor ($target: HTMLElement) {
    super($target);
    this.expenditureInMonthViewModel = new ExpenditureInMonthViewModel(this);
  }

  private onCategoryClicked = (e: Event) => {
    const target = e.target as HTMLElement;
    const { index } = target.dataset;
    if (index === undefined) {
      return;
    }

    const category = this.expenditureInMonthViewModel.expenditureGroupedByCategory[Number(index)];
    if (category?.category?.id === undefined) {
      return;
    }

    this.expenditureInMonthViewModel.fetchCategoryExpenditures(category.category.id);
  }

  private onCategoryMouseEnter = (e: Event) => {
    const target = e.target as HTMLElement;
    const { index } = target.dataset;
    if (index === undefined) {
      return;
    }

    this.pieChartUIElement?.emphasize(Number(index));
  }

  private onCategoryMouseLeave = () => {
    this.pieChartUIElement?.cancelEmphasize();
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    const { expenditurePieChartInput } = this.expenditureInMonthViewModel;
    this.$target.innerHTML = `
      <div class="expenditure-in-month">
        ${expenditurePieChartInput.length <= 0
          ? '<div class="pie-chart-view--no-data">데이터가 없습니다</div>'
          : `<div class="pie-chart-view"></div>
            <div class="grouped-expenditure">`
        }
        </div>
      </div>
    `;
  }

  protected mount (): void {
    const $pieChartView = $('.pie-chart-view');
    if ($pieChartView !== null) {
      this.pieChartUIElement = new PieChartUIElement($pieChartView, this.expenditureInMonthViewModel.expenditurePieChartInput, 420, 420);
      this.pieChartUIElement.build();
    }

    const $groupedExpenditure = $('.grouped-expenditure');
    if ($groupedExpenditure !== null) {
      new ExpenditureListUIElement($groupedExpenditure,
        this.expenditureInMonthViewModel.expenditureGroupedByCategory,
        this.expenditureInMonthViewModel.totalExpenditure,
        this.expenditureInMonthViewModel.focusedYear,
        this.expenditureInMonthViewModel.focusedMonth,
        this.onCategoryMouseEnter,
        this.onCategoryMouseLeave,
        this.onCategoryClicked
      ).build();
    }
  }
}

export default ExpenditureInMonthView;
