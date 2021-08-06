import View from '../../core/view';
import MonthlyCashHistory from '../../ui-elements/cash-history/monthly-cash-history';
import { formatNumber } from '../../utils/formatter';
import { $ } from '../../utils/selector';
import MainViewModel from '../../view-models/main';

import './index.css';

class MainView extends View {
  private mainViewModel: MainViewModel;
  private isIncomeChecked: boolean;
  private isExpenditureChecked: boolean;

  constructor ($target: HTMLElement) {
    super($target);
    this.mainViewModel = new MainViewModel(this);
    this.isIncomeChecked = true;
    this.isExpenditureChecked = true;
  }

  setActiveClass ($checkBox: HTMLElement, $filter: HTMLElement, isChecked: boolean): void {
    if (!isChecked) {
      if ($checkBox?.classList.contains('main__check-box--active')) {
        $checkBox.classList.remove('main__check-box--active');
        $filter?.classList.remove('main__filter--active');
      }
    } else {
      $checkBox?.classList.add('main__check-box--active');
      $filter?.classList.add('main__filter--active');
    }
  }

  onIncomeFilterClick (): void {
    this.isIncomeChecked = !this.isIncomeChecked;
    const $checkBox = $('.main__check-box--income');
    if ($checkBox === null) {
      return;
    }
    const $filter = $('.main__filter--income');
    if ($filter === null) {
      return;
    }
    this.setActiveClass($checkBox, $filter, this.isIncomeChecked);
    this.mainViewModel.filterButtonClick(this.isIncomeChecked, this.isExpenditureChecked);
  }

  onExpenditureFilterClick (): void {
    this.isExpenditureChecked = !this.isExpenditureChecked;
    const $checkBox = $('.main__check-box--expenditure');
    if ($checkBox === null) {
      return;
    }
    const $filter = $('.main__filter--expenditure');
    if ($filter === null) {
      return;
    }
    this.setActiveClass($checkBox, $filter, this.isExpenditureChecked);
    this.mainViewModel.filterButtonClick(this.isIncomeChecked, this.isExpenditureChecked);
  }

  protected addListener (): void {
    $('.main__filter--income')?.addEventListener('click', this.onIncomeFilterClick.bind(this));
    $('.main__filter--expenditure')?.addEventListener('click', this.onExpenditureFilterClick.bind(this));
  }

  protected render (): void {
    this.$target.innerHTML = `
      <div class="main__console">
        <div class="main__total">전체 내역 ${this.mainViewModel.cashHistoryCount}건</div>
        <div class="main__filter main__filter--income main__filter--active">
          <div class="main__check-box main__check-box--income main__check-box--active">
          <i class="wci wci-check"></i>
          </div>
          <div>수입 ${formatNumber(this.mainViewModel.incomeTotalPrice)}</div>
        </div>
        <div class="main__filter main__filter--expenditure main__filter--active">
          <div class="main__check-box main__check-box--expenditure main__check-box--active">
          <i class="wci wci-check"></i>
          </div>
          <div>지출 ${formatNumber(this.mainViewModel.expenditureTotalPrice)}</div>
        </div>
      </div>
      <div class="main__cash-history-list"></div>
    `;
  }

  protected mount (): void {
    const $mainCashList = $('.main__cash-history-list');
    if ($mainCashList === null) {
      return;
    }

    if (this.mainViewModel.cashHistories === undefined) {
      return;
    }
    new MonthlyCashHistory($mainCashList, this.mainViewModel.cashHistories, this.mainViewModel.onCashHistoryClick.bind(this.mainViewModel)).build();

    const $incomeCheckBox = $('.main__check-box--income');
    if ($incomeCheckBox === null) {
      return;
    }
    const $incomeFilter = $('.main__filter--income');
    if ($incomeFilter === null) {
      return;
    }
    this.setActiveClass($incomeCheckBox, $incomeFilter, this.isIncomeChecked);

    const $expenditureCheckBox = $('.main__check-box--expenditure');
    if ($expenditureCheckBox === null) {
      return;
    }
    const $expenditureFilter = $('.main__filter--expenditure');
    if ($expenditureFilter === null) {
      return;
    }
    this.setActiveClass($expenditureCheckBox, $expenditureFilter, this.isExpenditureChecked);
  }
}

export default MainView;
