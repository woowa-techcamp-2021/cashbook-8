import UIElement from '../../../core/ui-element';
import { CashHistoriesInDay } from '../../../types/cash-history';
import { EventListener } from '../../../types/dom';
import { $ } from '../../../utils/selector';
import CashRowUIElement from '../cash-row';

class DailyCashHistoryUIElement extends UIElement {
  private cashHistoriesInDay: CashHistoriesInDay;
  private onClick?: EventListener;
  static sequence = 0;

  constructor ($target: HTMLElement, cashHistoriesInDay: CashHistoriesInDay, onClick?: EventListener) {
    super($target);
    DailyCashHistoryUIElement.sequence += 1;
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
      <div class="daily-cash-history__row${DailyCashHistoryUIElement.sequence}"></div>
    `;
  }

  protected mount (): void {
    const $dailyCashHistoryRow = $(`.daily-cash-history__row${DailyCashHistoryUIElement.sequence}`);
    if ($dailyCashHistoryRow === null) {
      return;
    }
    this.cashHistoriesInDay.cashHistories.forEach(cashHistory => {
      new CashRowUIElement($dailyCashHistoryRow, cashHistory).build();
    });
  }
}

export default DailyCashHistoryUIElement;
