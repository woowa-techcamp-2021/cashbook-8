import CommonElement from './common-element';

type UIElementOptions = {
  className?: string;
  tag?: string;
}

abstract class UIElement extends CommonElement {
  protected $element: HTMLElement;

  constructor ($target: HTMLElement, options?: UIElementOptions) {
    super($target);
    this.$element = document.createElement(options?.tag ?? 'div');
    if (options?.className !== undefined) {
      this.$element.className = options.className;
    }

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
