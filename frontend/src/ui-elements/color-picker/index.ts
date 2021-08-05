import colors from '../../assets/styles/colors';
import UIElement from '../../core/ui-element';
import { generateRandomColor } from '../../utils/color';

import './index.css';

const COLOR_COUNT = 5;

class ColorPickerUIElement extends UIElement {
  private colors: string[] = [];
  private $palette?: HTMLElement;
  private $colorInput?: HTMLInputElement;
  private $refreshButton?: HTMLElement;

  constructor ($target: HTMLElement) {
    super($target, {
      className: 'color-picker'
    });
  }

  get value (): string | undefined {
    return this.$colorInput?.value;
  }

  clear (): void {
    if (this.$colorInput !== undefined) {
      this.$colorInput.value = '';
    }
  }

  private assignColors () {
    this.colors = [];

    for (let i = 0; i < COLOR_COUNT; i += 1) {
      this.colors.push(generateRandomColor());
    }
  }

  private renderPalette () {
    if (this.$palette === undefined) {
      return;
    }

    this.$palette.innerHTML = this.colors.map((color) => {
      return `
        <div data-color=${color} class="color-picker__color" style="background-color: ${color}"></div>
      `;
    }).join('');
  }

  protected render (): void {
    this.assignColors();
  }

  private getFontColorByBackground (color: string): string | undefined {
    const RGB_SUM_STD = 600;

    if (!color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) {
      return;
    }

    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    if (r + g + b < RGB_SUM_STD) {
      return colors.offWhite;
    }

    return colors.titleActive;
  }

  private setCurrentColor (color: string) {
    if (this.$colorInput !== undefined && this.$refreshButton) {
      this.$colorInput.value = color;
      this.$refreshButton.style.backgroundColor = color;
      const fontColor = this.getFontColorByBackground(color);
      fontColor && this.$refreshButton.style.setProperty('color', fontColor);
    }
  }

  private onPaletteClicked (e: Event) {
    const target = e.target as HTMLElement;
    const { color } = target.dataset;
    if (color === undefined) {
      return;
    }

    this.setCurrentColor(color);
  }

  private onColorInput (e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.setCurrentColor(value);
  }

  private onRefreshClicked () {
    this.assignColors();
    this.renderPalette();
  }

  protected addListener (): void {
    this.$palette?.addEventListener('click', this.onPaletteClicked.bind(this));
    this.$colorInput?.addEventListener('input', this.onColorInput.bind(this));
    this.$refreshButton?.addEventListener('click', this.onRefreshClicked.bind(this));
  }

  protected mount (): void {
    this.$palette = document.createElement('div');
    this.$palette.className = 'color-picker__palette';
    this.$element.appendChild(this.$palette);
    this.renderPalette();

    const $colorInputWrapper = document.createElement('div');
    $colorInputWrapper.className = 'color-picker__input-wrapper';
    this.$element.appendChild($colorInputWrapper);

    this.$colorInput = document.createElement('input');
    this.$colorInput.className = 'color-picker__color-hex';
    $colorInputWrapper.appendChild(this.$colorInput);

    this.$refreshButton = document.createElement('div');
    this.$refreshButton.className = 'color-picker__refresh color-picker__color';
    this.$refreshButton.innerHTML = 'RE';
    $colorInputWrapper.appendChild(this.$refreshButton);
  }
}

export default ColorPickerUIElement;
