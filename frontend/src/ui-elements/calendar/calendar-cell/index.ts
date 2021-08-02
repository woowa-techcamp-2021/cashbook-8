import UIElement from '../../../core/ui-element';
import { CashHistoriesInDay } from '../../../types/cash-history';
import { isSameDate } from '../../../utils/date';

import './index.css';

class CalendarCellUIElement extends UIElement {
  private cashHistoriesInDay: CashHistoriesInDay | undefined;

  constructor ($target: HTMLElement, cashHistoriesInDay?: CashHistoriesInDay) {
    super($target, {
      tag: 'td',
      className: 'calendar-cell'
    });
    this.cashHistoriesInDay = cashHistoriesInDay;
  }

  private makeTodayCell () {
    this.$element.classList.add('calendar-cell--today');
  }

  protected render (): void {
    if (this.cashHistoriesInDay === undefined || this.cashHistoriesInDay.cashHistories.length <= 0) {
      this.$element.innerHTML = `
        <div class="calendar-cell__container"></div>
      `;
      return;
    }

    const { date, income, expenditure } = this.cashHistoriesInDay;
    this.$element.innerHTML = `
      <div class="calendar-cell__container">
        <div class="calendar-cell__price-wrapper">
          <span class="calendar-cell__price calendar-cell__price--income">${income}</span>
          <span class="calendar-cell__price calendar-cell__price--expenditure">${expenditure}</span>
          <span class="calendar-cell__price calendar-cell__price--total">${expenditure - income}</span>
        </div>

        <div class="calendar-cell__date">${date}</div>
      </div>
    `;
  }

  protected addListener (): void {
    // no event
  }

  protected mount (): void {
    if (this.cashHistoriesInDay === undefined) {
      return;
    }

    const { year, month, date } = this.cashHistoriesInDay;
    if (isSameDate(new Date(year, month, date), new Date())) {
      this.makeTodayCell();
    }
  }
}

export default CalendarCellUIElement;
