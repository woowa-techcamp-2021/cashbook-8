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
  onCreateClicked?: () => void;
  onDeleteClicked: (id: string) => void;
}

const DEFAULT_SELECTED_LABEL = '선택하세요';

class DropDownUIElement extends UIElement {
  items: DropDownItem[];
  title: string;
  selected?: DropDownItem;
  private $dropDownList?: HTMLElement;
  private onDropDownClicked = this._onDropDownClicked.bind(this);
  private onChange?: (value?: string) => void;
  private $dropDownCreate?: HTMLElement;
  private onDropDownCreateClicked = this._onDropDownCreateClicked.bind(this);
  private onCreateClicked?: () => void;
  private onDeleteClicked: (id: string) => void;

  constructor ($target: HTMLElement, {
    title,
    items,
    onChange,
    initial,
    onCreateClicked,
    onDeleteClicked
  }: DropDownUIElementData) {
    super($target, {
      className: 'drop-down'
    });
    this.title = title;
    this.items = items;
    this.onChange = onChange;
    this.onCreateClicked = onCreateClicked;
    this.onDeleteClicked = onDeleteClicked;

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

    this.$dropDownCreate?.removeEventListener('click', this.onDropDownCreateClicked);
    this.$dropDownCreate?.addEventListener('click', this.onDropDownCreateClicked);
  }

  protected mount (): void {
    const $dropDownList = document.createElement('div');
    $dropDownList.className = 'drop-down__list';
    $dropDownList.innerHTML = `
      ${this.items.map((item) => `
        <div data-value=${item.value} class="drop-down__item">
          <div class="drop-down__label">
            <span>${item.label}</span>
            <i data-delete-value=${item.value} class="wci wci-close"></i>
          </div>
        </div>
      `).join('')}
    </div>`;
    this.$element.appendChild($dropDownList);
    this.$dropDownList = $dropDownList;

    const $dropDownCreateWrapper = document.createElement('div');
    $dropDownCreateWrapper.className = 'drop-down__item';
    $dropDownList.appendChild($dropDownCreateWrapper);

    this.$dropDownCreate = document.createElement('div');
    this.$dropDownCreate.className = 'drop-down__label drop-down__label--create';
    this.$dropDownCreate.innerHTML = '추가해주세요';
    $dropDownCreateWrapper.appendChild(this.$dropDownCreate);
  }

  private _onDropDownCreateClicked () {
    if (this.$dropDownCreate === undefined ||
      this.$dropDownCreate?.innerText.length <= 0 ||
      this.onCreateClicked === undefined) {
      return;
    }

    this.onCreateClicked();
  }

  private _onDropDownClicked (e: Event): void {
    const target = e.target as HTMLElement;
    const { value, deleteValue } = target.dataset;

    if (target.classList.contains('drop-down__label--create')) {
      return;
    }

    if (deleteValue !== undefined) {
      this.onDeleteClicked(deleteValue);
    }

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
