import UIElement from '../../core/ui-element';
import ColorPickerUIElement from '../color-picker';

import './index.css';

type InputModalData = {
  title: string;
  placeholder: string;
  confirm: (value: string, color?: string) => unknown;
  isDisabled?: boolean;
  hasColorPickerInput?: boolean;
}

class InputModal extends UIElement {
  private title: string;
  private placeholder: string;
  private confirm: (value: string, color?: string) => unknown;
  private initialValue?: string;
  private isDisabled?: boolean;
  private hasColorPickerInput?: boolean
  private value?: string;
  private $confirmButton?: HTMLElement;
  private $cancelButton?: HTMLElement;
  private $input?: HTMLInputElement;
  private colorPicker?: ColorPickerUIElement;

  constructor ($target: HTMLElement, {
    title,
    placeholder,
    confirm,
    isDisabled,
    hasColorPickerInput
  }: InputModalData) {
    super($target, {
      className: 'input-modal-wrapper disappear'
    });
    this.title = title;
    this.placeholder = placeholder;
    this.confirm = confirm;
    this.isDisabled = isDisabled;
    this.hasColorPickerInput = hasColorPickerInput;
  }

  protected render (): void {
    // no render
  }

  private onConfirmClicked () {
    this.confirm(this.value ?? this.$input?.value ?? '', this.colorPicker?.value ?? '');
  }

  open (value?: string, label?: string): void {
    this.$element.classList.remove('disappear');
    this.$element.classList.add('appear');
    this.value = value;
    label && this.$input?.setAttribute('value', label);
  }

  close (): void {
    this.$element.classList.remove('appear');
    this.$element.classList.add('disappear');
    if (this.$input !== undefined) {
      this.$input.value = '';
    }

    this.colorPicker?.clear();
  }

  private onCancelClicked () {
    this.close();
  }

  protected addListener (): void {
    this.$confirmButton?.addEventListener('click', this.onConfirmClicked.bind(this));
    this.$cancelButton?.addEventListener('click', this.onCancelClicked.bind(this));
  }

  protected mount (): void {
    const $inputModal = document.createElement('div');
    $inputModal.className = 'input-modal';
    this.$element.appendChild($inputModal);
    $inputModal.innerHTML = `
      <h1>${this.title}</h1>
    `;

    this.$input = document.createElement('input');
    this.$input.className = 'input-modal__input';
    this.$input.placeholder = this.placeholder;
    this.isDisabled && this.$input.setAttribute('disabled', 'true');
    this.initialValue && this.$input.setAttribute('value', this.initialValue);
    $inputModal.appendChild(this.$input);

    if (this.hasColorPickerInput) {
      this.colorPicker = new ColorPickerUIElement($inputModal);
      this.colorPicker.build();
    }

    const $buttonWrapper = document.createElement('div');
    $buttonWrapper.className = 'input-modal__button-wrapper';
    $inputModal.appendChild($buttonWrapper);

    this.$cancelButton = document.createElement('button');
    this.$cancelButton.className = 'input-modal__button input-modal__button--cancel';
    this.$cancelButton.innerText = '취소';
    $buttonWrapper.appendChild(this.$cancelButton);

    this.$confirmButton = document.createElement('button');
    this.$confirmButton.className = 'input-modal__button input-modal__button--confirm';
    $buttonWrapper.appendChild(this.$confirmButton);
    this.$confirmButton.innerText = '확인';
  }
}

export default InputModal;
