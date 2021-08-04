import UIElement from '../../../core/ui-element';
import { formatNumber } from '../../../utils/formatter';
import { $ } from '../../../utils/selector';
import { ExpenditureGroupedByCategory } from '../../../view-models/expenditure-in-month';

import './index.css';

class ExpenditureListUIElement extends UIElement {
  private expenditureGroupedByCategory: ExpenditureGroupedByCategory[];
  private totalExpenditure: number;
  private year: number;
  private month: number;
  private onCategoryMouseEnter: EventListener;
  private onCategoryMouseLeave: EventListener;

  constructor ($target: HTMLElement,
    expenditureGroupedByCategory: ExpenditureGroupedByCategory[],
    totalExpenditure: number,
    year: number,
    month: number,
    onCategoryMouseEnter: EventListener,
    onCategoryMouseLeave: EventListener) {
    super($target, {
      className: 'expenditure-list'
    });

    this.expenditureGroupedByCategory = expenditureGroupedByCategory;
    this.totalExpenditure = totalExpenditure;
    this.year = year;
    this.month = month;
    this.onCategoryMouseEnter = onCategoryMouseEnter;
    this.onCategoryMouseLeave = onCategoryMouseLeave;
  }

  protected render (): void {
    const { expenditureGroupedByCategory, totalExpenditure, year, month } = this;
    this.$element.innerHTML = `
      <div class="expenditure-list__title">
        ${year}년 ${month}월, ${formatNumber(totalExpenditure)}
      </div>

      
      <div class="expenditure-list-wrapper">
        ${expenditureGroupedByCategory.map(({ index, category, rate, expenditure }) => {
          return `
            <div class="expenditure-item" data-index=${index}>
              <div class="expenditure-item__category" style="background-color: ${category.color}">
                ${category.name}
              </div>

              <div class="expenditure-item__statistic">
                <span>${Math.round(rate)}%</span>
                <span>${formatNumber(expenditure)}</span>
              </div>
            </div>`;
        }).join('')}
    `;
  }

  protected addListener (): void {
    $('.expenditure-list-wrapper')?.addEventListener('mousemove', this.onCategoryMouseEnter);
    $('.expenditure-list-wrapper')?.addEventListener('mouseleave', this.onCategoryMouseLeave);
  }

  protected mount (): void {
    // no mount
  }
}

export default ExpenditureListUIElement;
