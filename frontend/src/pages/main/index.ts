import Page from '../../core/page';
import { $ } from '../../utils/selector';
import ConsoleView from '../../views/console';
import HeaderView from '../../views/header';
import MainView from '../../views/main';

import './index.css';

class MainPage extends Page {
  protected mount (): void {
    const $headerView = $('.header-view');
    const $consoleView = $('.console-view');
    const $mainView = $('.main-view');

    if ($headerView !== null) {
      const headerView = new HeaderView($headerView);
      headerView.build();
    }

    if ($consoleView !== null) {
      const consoleView = new ConsoleView($consoleView);
      consoleView.build();
    }

    if ($mainView !== null) {
      const mainView = new MainView($mainView);
      mainView.build();
    }
  }

  protected render ():void {
    this.$target.innerHTML = `
      <div>
        <div class="header-view"></div>
        <div class="console-view"></div>
        <div class="main-view"></div>
      </div>
    `;
  }
}

export default MainPage;
