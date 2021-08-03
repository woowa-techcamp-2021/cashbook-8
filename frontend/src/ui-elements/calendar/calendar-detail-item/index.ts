import UIElement from '../../../core/ui-element';
import { CashHistory } from '../../../types/cash-history';

import './index.css';

class CalendarDetailItemUIElement extends UIElement {
  private cashHistory: CashHistory;

  constructor ($target: HTMLElement, cashHistory: CashHistory) {
    super($target, {
      className: 'calendar-detail__item'
    });
    this.cashHistory = cashHistory;
  }

  protected render (): void {
    const { price, category, type, content } = this.cashHistory;
    // type enum 변경 필요
    this.$element.innerHTML = `
      <div class="calendar-detail__info-wrapper">
        <div class="calendar-detail__category"
          style="background-color: ${category.color};">
          ${category.name}
        </div>
        <span class="calendar-detail__content">${content}</span>
      </div>

      <span class="calendar-detail__price calendar-detail__price--${type === 0 ? 'income' : 'expenditure'}">
        ${price}
      </span>
    `;
  }

  protected addListener (): void {
    // no event
  }

  protected mount (): void {
    // no mount
  }
}

export default CalendarDetailItemUIElement;
