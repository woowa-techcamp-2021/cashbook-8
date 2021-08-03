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

  onCalendarCellClicked (e: Event): void {
    $('.calendar-cell__detail.appear')?.classList.replace('appear', 'disappear');

    const target = e.target as HTMLElement;
    const { sequence } = target.dataset;
    if (sequence === undefined) {
      return;
    }

    const $detail = $(`.calendar-cell--${sequence} .calendar-cell__detail`);
    $detail?.classList.toggle('disappear');
    $detail?.classList.toggle('appear');
  }

  onDocumentClicked (e: Event): void {
    const target = e.target as HTMLElement;
    const { sequence } = target.dataset;
    if (sequence !== undefined && $(`.calendar-cell--${sequence} .calendar-cell__detail.appear`)) {
      return;
    }

    $('.calendar-cell__detail.appear')?.classList.replace('appear', 'disappear');
  }

  protected addListener (): void {
    document.addEventListener('click', this.onDocumentClicked);
    $('.calendar__tbody')?.addEventListener('click', this.onCalendarCellClicked);
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
    let cellSequence = 0;

    // 비워있는 cell로 1일전까지 채움
    for (let i = 0; i < firstDayInMonth; i += 1) {
      new CalendarCellUIElement($tr, cellSequence++).build();
    }

    this.cashHistoriesInDays.forEach((cashHistory) => {
      new CalendarCellUIElement($tr, cellSequence++, cashHistory).build();
      cellCount += 1;

      if (cellCount % 7 === 0) {
        this.appendRow($tr);
        $tr = this.newTableRow();
      }
    });

    if (cellCount % 7 !== 0) {
      for (let i = 0; i < 7 - cellCount % 7; i += 1) {
        new CalendarCellUIElement($tr, cellSequence++).build();
      }
      this.appendRow($tr);
    }
  }
}

export default CalendarUIElement;
