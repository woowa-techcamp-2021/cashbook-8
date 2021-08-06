import colors from '../../../assets/styles/colors';
import UIElement from '../../../core/ui-element';
import { CashHistories } from '../../../enums/cash-history.enum';
import { CashHistory } from '../../../types/cash-history';
import { formatNumber } from '../../../utils/formatter';

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
    this.$element.innerHTML = `
      <div class="calendar-detail__info-wrapper">
        <div class="calendar-detail__category"
          style="background-color: ${category?.color ?? colors.primary};">
          ${category?.name ?? '미분류'}
        </div>
        <span class="calendar-detail__content">${content}</span>
      </div>

      <span class="calendar-detail__price calendar-detail__price--${type === CashHistories.Income ? 'income' : 'expenditure'}">
        ${formatNumber(price)}
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
