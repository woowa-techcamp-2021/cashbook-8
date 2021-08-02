import CommonElement from './common-element';

abstract class UIElement extends CommonElement {
  protected $element: HTMLElement;

  constructor ($target: HTMLElement) {
    super($target);
    this.$element = document.createElement('div');
    this.$target.appendChild(this.$element);
  }

  build (): void {
    this.render();
    this.mount();
    this.addListener();
  }

  protected abstract render(): void;
  protected abstract addListener (): void;
}

export default UIElement;
