import UIElement from '../../../core/ui-element';
import { CashHistoriesInDay } from '../../../types/cash-history';
import { EventListener } from '../../../types/dom';
import { $ } from '../../../utils/selector';
import CashHistoryRowUIElement from '../cash-history-row';

class MonthlyCashHistoryUIElement extends UIElement {
  private cashHistoriesInDay: CashHistoriesInDay;
  private onClick?: EventListener;
  static sequence = 0;

  constructor ($target: HTMLElement, cashHistoriesInDay: CashHistoriesInDay, onClick?: EventListener) {
    super($target);
    MonthlyCashHistoryUIElement.sequence += 1;
    this.cashHistoriesInDay = cashHistoriesInDay;
    this.onClick = onClick;
  }

  protected addListener (): void {
    if (this.onClick !== undefined) {
      this.$element.addEventListener('click', this.onClick);
    }
  }

  protected render (): void {
    this.$element.innerHTML = `
      <div class="daily-cash-history__row${MonthlyCashHistoryUIElement.sequence}"></div>
    `;
  }

  protected mount (): void {
    const $monthlyCashHistoryRow = $(`.daily-cash-history__row${MonthlyCashHistoryUIElement.sequence}`);
    if ($monthlyCashHistoryRow === null) {
      return;
    }
    this.cashHistoriesInDay.cashHistories.forEach(cashHistory => {
      new CashHistoryRowUIElement($monthlyCashHistoryRow, cashHistory).build();
    });
  }
}

export default MonthlyCashHistoryUIElement;
