abstract class CommonElement {
  protected $target: HTMLElement;

  constructor ($target: HTMLElement) {
    this.$target = $target;
  }

  abstract build (): void;
  protected abstract mount (): void;
  protected abstract render (): void;
}

export default CommonElement;
