import UIElement from '../../../core/ui-element';
import { formatNumber } from '../../../utils/formatter';
import { ExpenditureGroupedByCategory } from '../../../view-models/expenditure-in-month';

import './index.css';

class ExpenditureListUIElement extends UIElement {
  private expenditureGroupedByCategory: ExpenditureGroupedByCategory[];
  private totalExpenditure: number;
  private year: number;
  private month: number;

  constructor ($target: HTMLElement,
    expenditureGroupedByCategory: ExpenditureGroupedByCategory[],
    totalExpenditure: number,
    year: number,
    month: number) {
    super($target, {
      className: 'expenditure-list'
    });

    this.expenditureGroupedByCategory = expenditureGroupedByCategory;
    this.totalExpenditure = totalExpenditure;
    this.year = year;
    this.month = month;
  }

  protected render (): void {
    const { expenditureGroupedByCategory, totalExpenditure, year, month } = this;
    this.$element.innerHTML = `
      <div class="expenditure-list__title">
        ${year}년 ${month}월, ${formatNumber(totalExpenditure)}
      </div>

      
      <div class="expenditure-list-wrapper">
        ${expenditureGroupedByCategory.map(({ category, rate, expenditure }) => {
          return `
            <div class="expenditure-item">
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
    // no events
  }

  protected mount (): void {
    // no mount
  }
}

export default ExpenditureListUIElement;
