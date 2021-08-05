import View from '../../core/view';
import { $ } from '../../utils/selector';
import HeaderViewModel from '../../view-models/header';

import './index.css';
import '../../assets/icons/woowahan-cashbook-icons.css';
import Router, { ROUTER_PATH } from '../../core/router';
import { parsePath } from '../../utils/path';
import cookie from '../../utils/cookie';

class HeaderView extends View {
  private headerViewModel: HeaderViewModel;

  constructor ($target: HTMLElement) {
    super($target);
    this.headerViewModel = new HeaderViewModel(this);
  }

  onLogoClicked (): void {
    this.headerViewModel.navigate(ROUTER_PATH.MAIN);
  }

  onNavigatorClicked (e: Event): void {
    const target = e.target as HTMLElement;
    const { route } = target.dataset;

    if (route === undefined) {
      return;
    }

    this.headerViewModel.navigate(route);
  }

  private onLogoutClicked (): void {
    cookie.remove('accessToken');
    Router.instance.push('login');
  }

  protected addListener (): void {
    $('.header__button--previous')?.addEventListener('click',
      this.headerViewModel.onPreviousMonthClicked.bind(this.headerViewModel));
    $('.header__button--next')?.addEventListener('click',
      this.headerViewModel.onNextMonthClicked.bind(this.headerViewModel));
    $('.header__navigator')?.addEventListener('click',
      this.onNavigatorClicked.bind(this));
    $('.header__logo')?.addEventListener('click',
      this.onLogoClicked.bind(this));
    $('.header__logout')?.addEventListener('click',
      this.onLogoutClicked.bind(this));
  }

  protected render (): void {
    const path = parsePath(location.pathname);
    const { user } = this.headerViewModel;

    this.$target.innerHTML = `
      <header>
        <div class="header__container">
          <div class="header__logo-wrapper">
            <span class="header__logo">우아한 가계뿌</span>
            <div class="header__profile-container">
              <img src="${user?.avatarURL ?? ''}" />
              <div class="header__profile">
                <span>${user?.name ?? ''}님, 반갑습니다</span>
                <span class="header__logout">로그아웃</span>
              </div>
            </div>
          </div>

          <div class="header__focus-date-container">
            <i class="wci wci-chevron-left header__button header__button--previous"></i>
            <div class="header__focus-date">
              <div class="header__focus-month">${this.headerViewModel.focusedMonth}월</div>
              <div class="header__focus-year">${this.headerViewModel.focusedYear}</div>
            </div>
            <i class="wci wci-chevron-right header__button header__button--next"></i>
          </div>

          <div class="header__navigator">
            <i data-route="${ROUTER_PATH.MAIN}"
              class="wci wci-file-text ${path === ROUTER_PATH.MAIN && 'current-path'}"></i>
            <i data-route="${ROUTER_PATH.CALENDAR}"
              class="wci wci-calendar ${path === ROUTER_PATH.CALENDAR && 'current-path'}"></i>
            <i data-route="${ROUTER_PATH.CHART}"
              class="wci wci-chart ${path === ROUTER_PATH.CHART && 'current-path'}"></i>
          </div>
        </div>
      </header>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default HeaderView;
