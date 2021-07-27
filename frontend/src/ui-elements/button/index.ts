import UIElement from '../../core/ui-element';
import { EventListener } from '../../types/dom';

class ButtonUIElement extends UIElement {
  private onClick?: EventListener;

  constructor ($target: HTMLElement, onClick?: EventListener) {
    super($target);
    this.onClick = onClick;
  }

  protected addListener () {
    if (this.onClick !== undefined) {
      this.$element.addEventListener('click', this.onClick);
    }
  }

  protected render () {
    this.$element.innerHTML = `
      <button>확인</button>
    `;
  }
}

export default ButtonUIElement;
