import UIElement from '../../../core/ui-element';
import { TotalPrices } from '../../../types/cash-history';

import './index.css';

class CalendarTotalPriceUIElement extends UIElement {
  private totalPrices: TotalPrices;

  constructor ($target: HTMLElement, totalPrices: TotalPrices) {
    super($target, {
      className: 'calendar-total-price'
    });
    this.totalPrices = totalPrices;
  }

  protected render (): void {
    const { totalPrice, totalIncome, totalExpenditure } = this.totalPrices;
    this.$element.innerHTML = `
    <div class="calendar-total-price__info-wrapper">
      <div class="calendar-total-price__content">
        <span class="calendar-total-price__label">총 수입</span>
        <span class="calendar-total-price__price">${totalIncome}</span>
      </div>

      <div class="calendar-total-price__content">
        <span class="calendar-total-price__label">총 지출</span>
        <span class="calendar-total-price__price">${totalExpenditure}</span>
      </div>
    </div>

    <div class="calendar-total-price__content">
      <span class="calendar-total-price__label">총계</span>
      <span class="calendar-total-price__price">${totalPrice}</span>
    <div>
    `;
  }

  protected addListener (): void {
    // no event
  }

  protected mount (): void {
    // no mount
  }
}

export default CalendarTotalPriceUIElement;
