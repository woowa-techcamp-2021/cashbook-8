import View from '../../core/view';
import DailyCashHistory from '../../ui-elements/cash-history/daily-cash-history';
import { getDayString } from '../../utils/date';
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

  onIncomeFilterClick (): void {
    this.isIncomeChecked = !this.isIncomeChecked;
    const $checkBox = $('.main__check-box--income');
    const $filter = $('.main__filter');
    if (!this.isIncomeChecked) {
      if ($checkBox?.classList.contains('main__check-box--active')) {
        $checkBox.classList.remove('main__check-box--active');
        $filter?.classList.remove('main__filter--active');
      }
    } else {
      $checkBox?.classList.add('main__check-box--active');
      $filter?.classList.add('main__filter--active');
    }
    // console.log($checkBox, $filter);
    this.mainViewModel.filterButtonClick(this.isIncomeChecked, this.isExpenditureChecked);
  }

  onExpenditureFilterClick (): void {
    this.isExpenditureChecked = !this.isExpenditureChecked;
    if (!this.isIncomeChecked) {
      $('.main__check-box--expenditure')?.classList.remove('main__check-box--active');
    } else {
      $('.main__check-box--expenditure')?.classList.add('main__check-box--active');
    }
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
      <div class="main__cash-list"></div>
    `;
  }

  protected mount (): void {
    const $mainCashList = $('.main__cash-list');
    if ($mainCashList === null) {
      return;
    }

    this.mainViewModel.cashHistories?.forEach(cashHistory => {
      if (cashHistory.cashHistories.length === 0) {
        return;
      }
      const $date = document.createElement('div');
      $date.innerHTML = `
        <div class="main__cash-list-header">
          <div class="">${cashHistory.month}월 ${cashHistory.date}일</div>
          <div class="main__cash-list-day">${getDayString(cashHistory.day)}</div>
          <div class="main__cash-list-income">수입 ${formatNumber(cashHistory.income)}</div>
          <div class="main__cash-list-expenditure">지출 ${formatNumber(cashHistory.expenditure)}</div>
        </div>
      `;
      $mainCashList.appendChild($date);
      new DailyCashHistory($mainCashList, cashHistory, this.mainViewModel.onCashHistoryClick.bind(this.mainViewModel)).build();
    });
  }
}

export default MainView;
