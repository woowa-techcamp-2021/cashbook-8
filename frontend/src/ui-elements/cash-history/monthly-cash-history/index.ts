import UIElement from '../../../core/ui-element';
import { CashHistoriesInDay } from '../../../types/cash-history';
import { EventListener } from '../../../types/dom';
import { getDayString } from '../../../utils/date';
import { formatNumber } from '../../../utils/formatter';
import { $ } from '../../../utils/selector';
import CashHistoryRowUIElement from '../cash-history-row';

import './index.css';

class MonthlyCashHistoryUIElement extends UIElement {
  private cashHistoriesInDays: CashHistoriesInDay[];
  private onClick?: EventListener;

  constructor ($target: HTMLElement, cashHistoriesInDays: CashHistoriesInDay[], onClick?: EventListener) {
    super($target);
    this.cashHistoriesInDays = cashHistoriesInDays;
    this.onClick = onClick;
  }

  protected addListener (): void {
    if (this.onClick !== undefined) {
      this.$element.addEventListener('click', this.onClick);
    }
  }

  protected render (): void {
    this.$element.innerHTML = `
      <div class="monthly-cash-history__container"></div>
    `;
  }

  protected mount (): void {
    const $container = $('.monthly-cash-history__container');
    if ($container === null) {
      return;
    }
    this.cashHistoriesInDays.forEach(cashHistoriesInDay => {
      if (cashHistoriesInDay.cashHistories.length === 0) {
        return;
      }
      const $date = document.createElement('div');
      $date.innerHTML = `
        <div class="monthly-cash-history__header">
          <div class="">${cashHistoriesInDay.month}월 ${cashHistoriesInDay.date}일</div>
          <div class="monthly-cash-history__day">${getDayString(cashHistoriesInDay.day)}</div>
          <div class="monthly-cash-history__income">수입 ${formatNumber(cashHistoriesInDay.income)}</div>
          <div class="monthly-cash-history__expenditure">지출 ${formatNumber(cashHistoriesInDay.expenditure)}</div>
        </div>
      `;
      $container.appendChild($date);

      const $dailyCashHistory = document.createElement('div');

      cashHistoriesInDay.cashHistories.forEach(cashHistory => {
        new CashHistoryRowUIElement($dailyCashHistory, cashHistory).build();
      });
      $container.appendChild($dailyCashHistory);
    });
  }
}

export default MonthlyCashHistoryUIElement;
