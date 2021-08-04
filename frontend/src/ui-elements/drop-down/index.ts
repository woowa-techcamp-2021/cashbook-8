import UIElement from '../../core/ui-element';

import './index.css';

type DropDownItem = {
  value: string;
  label: string;
}

type DropDownUIElementData = {
  title: string;
  items: DropDownItem[];
  onChange?: (value?: string) => void;
  initial?: string;
}

const DEFAULT_SELECTED_LABEL = '선택하세요';

class DropDownUIElement extends UIElement {
  items: DropDownItem[];
  title: string;
  selected?: DropDownItem;
  private $dropDownList?: HTMLElement;
  private onDropDownClicked = this._onDropDownClicked.bind(this);
  private onChange?: (value?: string) => void;

  constructor ($target: HTMLElement, {
    title,
    items,
    onChange,
    initial
  }: DropDownUIElementData) {
    super($target, {
      className: 'drop-down'
    });
    this.title = title;
    this.items = items;
    this.onChange = onChange;

    if (initial !== undefined) {
      this.selected = this.items.find((item) => item.value === initial);
    }
  }

  protected render (): void {
    this.$element.innerHTML = `
      <span class="drop-down__title console__title">${this.title}</span>
      <span class="drop-down__selected">
        <span class="drop-down__selected-label">${this.selected?.label ?? DEFAULT_SELECTED_LABEL}</span>
        <i class="wci wci-chevron-down"></i>
      </span>
    `;
  }

  protected addListener (): void {
    this.$element.removeEventListener('click', this.onDropDownClicked);
    this.$element.addEventListener('click', this.onDropDownClicked);
  }

  protected mount (): void {
    const $dropDownList = document.createElement('div');
    $dropDownList.className = 'drop-down__list';
    $dropDownList.innerHTML = `
      ${this.items.map((item) => `
        <div data-value=${item.value} class="drop-down__item">
          <div class="drop-down__label">${item.label}</div>
        </div>
      `).join('')}
    </div>`;
    this.$element.appendChild($dropDownList);
    this.$dropDownList = $dropDownList;
  }

  private _onDropDownClicked (e: Event): void {
    const target = e.target as HTMLElement;
    const { value } = target.dataset;

    if (value === undefined) {
      this.$dropDownList?.classList.toggle('appear');
      return;
    }

    this.selected = this.items.find((item) => item.value === value);
    if (this.onChange !== undefined) {
      this.onChange(this.selected?.value);
    }

    this.build();
  }
}

export default DropDownUIElement;
