import UIElement from '../../core/ui-element';
import { $ } from '../../utils/selector';

import './index.css';

class DropDownUIElement extends UIElement {
  private dropDownItems: string[];
  private onClick?: EventListener;
  static dropDownSequence = 0;

  constructor ($target: HTMLElement, dropDownItems: string[], onClick?: EventListener) {
    super($target);
    this.dropDownItems = dropDownItems;
    this.onClick = onClick;
    DropDownUIElement.dropDownSequence += 1;
  }

  show (): void {
    this.$target.querySelector('.drop-down__container')?.classList.remove('display-none');
  }

  hide (): void {
    this.$target.querySelector('.drop-down__container')?.classList.add('display-none');
  }

  protected addListener (): void {
    if (this.onClick !== undefined) {
      this.$element.addEventListener('click', this.onClick);
    }
  }

  protected render (): void {
    this.$element.innerHTML = `
      <div class="drop-down__container display-none">
        <div class="drop-down__panels panel${DropDownUIElement.dropDownSequence}"></div>
      </div>
    `;
  }

  protected mount (): void {
    const $panel = $(`.panel${DropDownUIElement.dropDownSequence}`);
    if ($panel !== null) {
      $panel.innerHTML = this.dropDownItems.reduce((template, name) => {
        return template + `
        <div data-name=${name} class="drop-down__panel">
          <div data-name=${name} class="drop-down__panel-inner">
            ${name}
          </div>
        </div>
      `;
      }, '');
    }
  }
}

export default DropDownUIElement;
