abstract class CommonElement {
  protected $target: HTMLElement;

  constructor ($target: HTMLElement) {
    this.$target = $target;
  }

  protected mount () {};

  abstract build (): void;

  protected abstract render (): void;
}

export default CommonElement;
