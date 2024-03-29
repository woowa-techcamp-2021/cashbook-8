import colors from '../../../assets/styles/colors';
import UIElement from '../../../core/ui-element';
import { CashHistory } from '../../../types/cash-history';
import { EventListener } from '../../../types/dom';
import { formatNumber } from '../../../utils/formatter';

import './index.css';

class CashHistoryRowUIElement extends UIElement {
  private cashHistory: CashHistory;
  private onClick?: EventListener;

  constructor ($target: HTMLElement, CashHistory: CashHistory, onClick?: EventListener) {
    super($target);
    this.cashHistory = CashHistory;
    this.onClick = onClick;
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    const { id, category, content, payment, price } = this.cashHistory;
    this.$element.innerHTML = `
      <div data-id="${id}" class="cash-history__container">
        <div data-id="${id}" class="cash-history__category" style="background-color: ${category?.color ?? colors.primary}">${category?.name ?? '미분류'}</div>
        <div data-id="${id}" class="cash-history__content">${content}</div>
        <div data-id="${id}" class="cash-history__payment">${payment?.name ?? '-'}</div>
        <div data-id="${id}" class="cash-history__price">${formatNumber(price)}</div>
      </div>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default CashHistoryRowUIElement;
