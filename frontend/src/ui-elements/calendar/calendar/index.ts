import UIElement from '../../../core/ui-element';
import { CashHistoriesInDay } from '../../../types/cash-history';
import { $ } from '../../../utils/selector';
import CalendarCellUIElement from '../calendar-cell';

import './index.css';

class CalendarUIElement extends UIElement {
  private cashHistoriesInDays: CashHistoriesInDay[];

  constructor ($target: HTMLElement, cashHistoriesInDays: CashHistoriesInDay[]) {
    super($target, {
      className: 'calendar',
      tag: 'table'
    });
    this.cashHistoriesInDays = cashHistoriesInDays;
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    this.$element.innerHTML = `
      <thead>
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>

      <tbody>
      </tbody>
    `;
  }

  private appendRow ($tr: HTMLTableRowElement): void {
    const $tbody = $('.calendar>tbody');
    if ($tbody === null) {
      return;
    }

    $tbody.appendChild($tr);
  }

  protected mount (): void {
    const firstDayInMonth = this.cashHistoriesInDays[0].day;
    let cellCount = firstDayInMonth;

    let $tr = document.createElement('tr');

    // 비워있는 cell로 1일전까지 채움
    for (let i = 0; i < firstDayInMonth; i += 1) {
      new CalendarCellUIElement($tr).build();
    }

    this.cashHistoriesInDays.forEach((cashHistory) => {
      new CalendarCellUIElement($tr, cashHistory).build();
      cellCount += 1;

      if (cellCount % 7 === 0) {
        this.appendRow($tr);
        $tr = document.createElement('tr');
      }
    });

    if (cellCount % 7 !== 0) {
      this.appendRow($tr);
    }
  }
}

export default CalendarUIElement;
