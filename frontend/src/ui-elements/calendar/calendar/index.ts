import UIElement from '../../../core/ui-element';
import { CashHistoriesInDay } from '../../../types/cash-history';
import { $ } from '../../../utils/selector';
import CalendarCellUIElement from '../calendar-cell';

import './index.css';

class CalendarUIElement extends UIElement {
  private cashHistoriesInDays: CashHistoriesInDay[];

  constructor ($target: HTMLElement, cashHistoriesInDays: CashHistoriesInDay[]) {
    super($target, {
      className: 'calendar'
    });
    this.cashHistoriesInDays = cashHistoriesInDays;
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    this.$element.innerHTML = `
      <div class="calendar__thead">
        <div class="calendar__trow">
          <div class="calendar__td--thead">일</div>
          <div class="calendar__td--thead">월</div>
          <div class="calendar__td--thead">화</div>
          <div class="calendar__td--thead">수</div>
          <div class="calendar__td--thead">목</div>
          <div class="calendar__td--thead">금</div>
          <div class="calendar__td--thead">토</div>
        </div>
      </div>

      <div class="calendar__tbody">
      </div>
    `;
  }

  private appendRow ($tr: HTMLDivElement): void {
    const $tbody = $('.calendar__tbody');
    if ($tbody === null) {
      return;
    }

    $tbody.appendChild($tr);
  }

  private newTableRow (): HTMLDivElement {
    const $tr = document.createElement('div');
    $tr.className = 'calendar__trow';

    return $tr;
  }

  protected mount (): void {
    const firstDayInMonth = this.cashHistoriesInDays[0].day;
    let cellCount = firstDayInMonth;

    let $tr = this.newTableRow();

    // 비워있는 cell로 1일전까지 채움
    for (let i = 0; i < firstDayInMonth; i += 1) {
      new CalendarCellUIElement($tr).build();
    }

    this.cashHistoriesInDays.forEach((cashHistory) => {
      new CalendarCellUIElement($tr, cashHistory).build();
      cellCount += 1;

      if (cellCount % 7 === 0) {
        this.appendRow($tr);
        $tr = this.newTableRow();
      }
    });

    if (cellCount % 7 !== 0) {
      for (let i = 0; i < 7 - cellCount % 7; i += 1) {
        new CalendarCellUIElement($tr).build();
      }
      this.appendRow($tr);
    }
  }
}

export default CalendarUIElement;
