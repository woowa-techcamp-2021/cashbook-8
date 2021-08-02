import View from '../../core/view';
import { $ } from '../../utils/selector';
import HeaderViewModel from '../../view-models/header';

import './index.css';
import '../../assets/icons/woowahan-cashbook-icons.css';

class HeaderView extends View {
  private headerViewModel: HeaderViewModel;

  constructor ($target: HTMLElement) {
    super($target);
    this.headerViewModel = new HeaderViewModel(this);
  }

  protected addListener (): void {
    $('.header__button--previous')?.addEventListener('click',
      this.headerViewModel.onPreviousMonthClicked.bind(this.headerViewModel));
    $('.header__button--next')?.addEventListener('click',
      this.headerViewModel.onNextMonthClicked.bind(this.headerViewModel));
  }

  protected render (): void {
    this.$target.innerHTML = `
      <header>
        <div class="header__container">
          <div class="header__logo">
            우아한 가계부
          </div>

          <div class="header__focus-date-container">
            <i class="wci wci-chevron-left header__button--previous"></i>
            <div class="header__focus-date">
              <div class="header__focus-month">${this.headerViewModel.focusedMonth}월</div>
              <div class="header__focus-year">${this.headerViewModel.focusedYear}</div>
            </div>
            <i class="wci wci-chevron-right header__button--next"></i>
          </div>

          <div class="header__navigator">
            <i class="wci wci-file-text"></i>
            <i class="wci wci-calendar"></i>
            <i class="wci wci-chart"></i>
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
