import UIElement from '../../../core/ui-element';
import { CashHistoriesInDay } from '../../../types/cash-history';
import { isSameDate } from '../../../utils/date';
import { formatNumber } from '../../../utils/formatter';
import CalendarDetailUIElement from '../calendar-detail';

import './index.css';

class CalendarCellUIElement extends UIElement {
  private cashHistoriesInDay: CashHistoriesInDay | undefined;
  private calendarDetailUIElement: CalendarDetailUIElement | undefined;

  constructor ($target: HTMLElement, cellSequence: number, cashHistoriesInDay?: CashHistoriesInDay) {
    super($target, {
      className: `calendar__td calendar-cell calendar-cell--${cellSequence}`
    });
    this.$element.dataset.sequence = cellSequence.toString();
    this.cashHistoriesInDay = cashHistoriesInDay;
  }

  private makeTodayCell () {
    this.$element.classList.add('calendar-cell--today');
  }

  protected render (): void {
    if (this.cashHistoriesInDay === undefined) {
      this.$element.innerHTML = `
        <div class="calendar-cell__container"></div>
      `;
      return;
    }

    const { date, income, expenditure } = this.cashHistoriesInDay;
    if (this.cashHistoriesInDay.cashHistories.length <= 0) {
      this.$element.innerHTML = `
        <div class="calendar-cell__container">
          <div class="calendar-cell__price-wrapper"></div>
          <div class="calendar-cell__date-wrapper">
            <span class="calendar-cell__date">${date}</span>
          </div>
        </div>
      `;
      return;
    }

    this.$element.innerHTML = `
      <div class="calendar-cell__container">
        <div class="calendar-cell__price-wrapper">
          ${income > 0 ? `<span class="calendar-cell__price calendar-cell__price--income">${formatNumber(income)}</span>` : ''}
          ${expenditure > 0 ? `<span class="calendar-cell__price calendar-cell__price--expenditure">${formatNumber(expenditure)}</span>` : ''}
          ${income > 0 && expenditure > 0 ? `<span class="calendar-cell__price calendar-cell__price--total">${formatNumber(income - expenditure)}</span>` : ''}
        </div>

        <div class="calendar-cell__date-wrapper">
          <span class="calendar-cell__date">${date}</span>
        </div>
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
    if (isSameDate(new Date(year, month - 1, date), new Date())) {
      this.makeTodayCell();
    }

    const { cashHistories } = this.cashHistoriesInDay;
    if (cashHistories.length > 0) {
      this.calendarDetailUIElement = new CalendarDetailUIElement(this.$element, cashHistories);
      this.calendarDetailUIElement.build();
    }
  }
}

export default CalendarCellUIElement;
