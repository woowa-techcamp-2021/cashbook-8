import View from '../../core/view';
import CalendarUIElement from '../../ui-elements/calendar/calendar';
import { $ } from '../../utils/selector';
import CalendarViewModel from '../../view-models/calendar';

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
      </div>
    `;
  }

  protected mount (): void {
    const $calendarView = $('.calendar-view');
    const { monthlyCashHistories } = this.calendarViewModel;

    if ($calendarView === null || monthlyCashHistories === undefined) {
      return;
    }

    new CalendarUIElement($calendarView, monthlyCashHistories).build();
  }
}

export default CalendarView;
