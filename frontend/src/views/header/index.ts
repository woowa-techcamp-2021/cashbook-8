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
        <div>
          우아한 가계부
        </div>

        <div>
          <i class="wci wci-chevron-left header__button--previous"></i>
          <div>
            <div>${this.headerViewModel.focusedMonth}월</div>
            <div>${this.headerViewModel.focusedYear}</div>
          <div>
          <i class="wci wci-chevron-right header__button--right"></i>
        </div>

        <div>
          <i class="wci wci-file-text"></i>
          <i class="wci wci-calendar"></i>
          <i class="wci wci-chart"></i>
        </div>
      </header>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default HeaderView;
