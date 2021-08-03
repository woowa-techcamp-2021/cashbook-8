import UIElement from '../../../core/ui-element';
import { CashHistory } from '../../../types/cash-history';
import CalendarDetailItemUIElement from '../calendar-detail-item';

import './index.css';

class CalendarDetailUIElement extends UIElement {
  private cashHistories: CashHistory[];
  constructor ($target: HTMLElement, cashHistories: CashHistory[]) {
    super($target, {
      className: 'calendar-cell__detail disappear'
    });
    this.cashHistories = cashHistories;
  }

  protected render (): void {
    this.$element.innerHTML = `
      <div class="calendar-detail__arrow"></div>
    `;
  }

  toggle (): void {
    this.$element.classList.toggle('disappear');
    this.$element.classList.toggle('appear');
  }

  disappear (): void {
    this.$element.classList.replace('appear', 'disappear');
  }

  protected addListener (): void {
    // no event
  }

  protected mount (): void {
    const $calendarDetailList = document.createElement('div');
    $calendarDetailList.className = 'calendar-detail__list';

    this.cashHistories.forEach((cashHistory) => {
      new CalendarDetailItemUIElement($calendarDetailList, cashHistory).build();
    });

    this.$element.appendChild($calendarDetailList);
  }
}

export default CalendarDetailUIElement;
