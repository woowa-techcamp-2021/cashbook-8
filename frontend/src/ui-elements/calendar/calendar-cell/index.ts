import UIElement from '../../../core/ui-element';
import { CashHistoriesInDay } from '../../../types/cash-history';

import './index.css';

class CalendarCellUIElement extends UIElement {
  private cashHistoriesInDay: CashHistoriesInDay | undefined;

  constructor ($target: HTMLElement, cashHistoriesInDay?: CashHistoriesInDay) {
    super($target);
    this.cashHistoriesInDay = cashHistoriesInDay;
  }

  protected render (): void {
    if (this.cashHistoriesInDay === undefined) {
      this.$element.innerHTML = `
        <td class="calendar-cell">
        </td>
      `;
      return;
    }

    const { date, income, expenditure } = this.cashHistoriesInDay;
    this.$element.innerHTML = `
      <td class="calendar-cell">
        <div class="calendar-cell__price-wrapper">
          <span class="calendar-cell__price calendar-cell__price--income">${income}</span>
          <span class="calendar-cell__price calendar-cell__price--expenditure">${expenditure}</span>
          <span class="calendar-cell__price calendar-cell__price--total">${expenditure - income}</span>
        </div>

        <div class="calendar-cell__date">${date}</div>
      </td>
    `;
  }

  protected addListener (): void {
    // no event
  }

  protected mount (): void {
    // no mount
  }
}

export default CalendarCellUIElement;
