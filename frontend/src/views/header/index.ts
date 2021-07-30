import View from '../../core/view';
import ButtonUIElement from '../../ui-elements/button';
import { $ } from '../../utils/selector';
import HeaderViewModel from '../../view-models/header';

class HeaderView extends View {
  private headerViewModel: HeaderViewModel;

  constructor ($target: HTMLElement) {
    super($target);
    this.headerViewModel = new HeaderViewModel(this);
  }

  protected mount (): void {
    const $header = $('header');
    if ($header !== null) {
      const $button = new ButtonUIElement($header, this.headerViewModel.onNextMonthClicked.bind(this.headerViewModel));
      $button.build();
    }
  }

  protected render (): void {
    this.$target.innerHTML = `
      <header>
        ${this.headerViewModel.formatTime}
        <div>
          ${this.headerViewModel.cashHistories}
        </div>
      </header>
    `;

    this.addListener();
  }
}

export default HeaderView;
