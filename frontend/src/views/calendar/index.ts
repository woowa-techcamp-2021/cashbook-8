import View from '../../core/view';
import CalendarUIElement from '../../ui-elements/calendar/calendar';
import CalendarTotalPriceUIElement from '../../ui-elements/calendar/calendar-total-price';
import { $ } from '../../utils/selector';
import CalendarViewModel from '../../view-models/calendar';

import './index.css';

class CalendarView extends View {
  private calendarViewModel: CalendarViewModel;

  constructor ($target: HTMLElement) {
    super($target);
    this.calendarViewModel = new CalendarViewModel(this);
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    this.$target.innerHTML = `
    <div class="calendar-view">
      <div class="calendar-ui">
      </div>

      <div class="calendar-total-price">
      </div>
    </div>
    `;
  }

  protected mount (): void {
    const $calendarUI = $('.calendar-ui');
    const { monthlyCashHistories } = this.calendarViewModel;

    if (!($calendarUI === null || monthlyCashHistories === undefined)) {
      new CalendarUIElement($calendarUI, monthlyCashHistories).build();
    }

    const $calendarTotalPrice = $('.calendar-total-price');
    if ($calendarTotalPrice !== null) {
      new CalendarTotalPriceUIElement($calendarTotalPrice, this.calendarViewModel.totalPrices).build();
    }
  }
}

export default CalendarView;
