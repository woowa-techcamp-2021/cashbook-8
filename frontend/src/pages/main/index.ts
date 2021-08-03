import Page from '../../core/page';
import { $ } from '../../utils/selector';
import HeaderView from '../../views/header';
import MainView from '../../views/main';

class MainPage extends Page {
  protected mount (): void {
    const $headerView = $('.header-view');
    const $mainView = $('.main-view');

    if ($headerView === null || $mainView === null) {
      return;
    }
    const headerView = new HeaderView($headerView);
    const mainView = new MainView($mainView);

    headerView.build();
    mainView.build();
  }

  protected render ():void {
    this.$target.innerHTML = `
      <div>
        <div class="header-view"></div>
        <div class="main-view"></div>
      </div>
    `;
  }
}

export default MainPage;
