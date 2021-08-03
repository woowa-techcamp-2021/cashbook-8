import UIElement from '../../../core/ui-element';
import { CashHistory } from '../../../types/cash-history';
import { EventListener } from '../../../types/dom';

import './index.css';

class CashRowUIElement extends UIElement {
  private cashHistory: CashHistory;
  private onClick?: EventListener;

  constructor ($target: HTMLElement, CashHistory: CashHistory, onClick?: EventListener) {
    super($target);
    this.cashHistory = CashHistory;
    this.onClick = onClick;
  }

  protected addListener (): void {
    if (this.onClick !== undefined) {
      this.$element.addEventListener('click', this.onClick);
    }
  }

  protected render (): void {
    const { category, content, payment, price } = this.cashHistory;
    this.$element.innerHTML = `
      <div class="cash-history__container">
        <div class="cash-history__category" style="background-color: ${category.color}">${category.name}</div>
        <div class="cash-history__content">${content}</div>
        <div class="cash-history__payment">${payment.name}</div>
        <div class="cash-history__price">${price}</div>
      </div>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default CashRowUIElement;
