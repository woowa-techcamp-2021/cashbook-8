import Page from '../../core/page';
import { $ } from '../../utils/selector';
import CalendarView from '../../views/calendar';
import HeaderView from '../../views/header';

import './index.css';

class CalendarPage extends Page {
  protected render (): void {
    this.$target.innerHTML = `
    <div class="calendar-page">
      <div class="header-container"></div>
      <div class="calendar-view-container"></div>
    </div>
    `;
  }

  protected mount (): void {
    const $headerContainer = $('.header-container');
    if ($headerContainer !== null) {
      const headerView = new HeaderView($headerContainer);
      headerView.build();
    }

    const $calendarViewContainer = $('.calendar-view-container');
    if ($calendarViewContainer !== null) {
      const calendarView = new CalendarView($calendarViewContainer);
      calendarView.build();
    }
  }
}

export default CalendarPage;
