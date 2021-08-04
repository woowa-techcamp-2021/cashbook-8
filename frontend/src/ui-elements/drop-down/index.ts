import UIElement from '../../core/ui-element';
import { $ } from '../../utils/selector';

import './index.css';

type DropDownItem = {
  value: string;
  label: string;
}

type DropDownUIElementData = {
  title: string;
  items: DropDownItem[];
}

const DEFAULT_SELECTED_LABEL = '선택하세요';

class DropDownUIElement extends UIElement {
  private title: string;
  private items: DropDownItem[];
  private selected?: DropDownItem;

  constructor ($target: HTMLElement, {
    title,
    items
  }: DropDownUIElementData) {
    super($target, {
      className: 'drop-down'
    });
    this.title = title;
    this.items = items;
  }

  protected render (): void {
    this.$element.innerHTML = `
      <span class="drop-down__title console__title">${this.title}</span>
      <span class="drop-down__selected">
        <span class="drop-down__selected-label">${this.selected?.label ?? DEFAULT_SELECTED_LABEL}</span>
        <i class="wci wci-chevron-down"></i>
      </span>
      <div class="drop-down__list">
        ${this.items.map((item) => `
          <div data-value=${item.value} class="drop-down__item">
            <div class="drop-down__label">${item.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  protected addListener (): void {
    $('.drop-down')?.addEventListener('click', this.onDropDownClicked.bind(this));
  }

  protected mount (): void {
    // no mount
  }

  onDropDownClicked (e: Event): void {
    const target = e.target as HTMLElement;
    const { value } = target.dataset;

    if (value === undefined) {
      console.log($('.drop-down__list')?.classList);
      $('.drop-down__list')?.classList.toggle('appear');
      return;
    }

    this.selected = this.items.find((item) => item.value === value);

    $('.drop-down__list')?.classList.remove('appear');
    const $selectedLabel = $('.drop-down__selected-label');
    if ($selectedLabel !== null) {
      $selectedLabel.innerText = this.selected?.label ?? DEFAULT_SELECTED_LABEL;
    }
  }

  show (): void {
    this.$target.querySelector('.drop-down__container')?.classList.remove('display-none');
  }

  hide (): void {
    this.$target.querySelector('.drop-down__container')?.classList.add('display-none');
  }
}

export default DropDownUIElement;
