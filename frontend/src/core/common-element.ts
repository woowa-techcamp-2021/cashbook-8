abstract class CommonElement {
  protected $target: HTMLElement;

  constructor ($target: HTMLElement) {
    this.$target = $target;
  }

  protected mount (): void {
    // mount시 실행될 내용
  }

  abstract build (): void;

  protected abstract render (): void;
}

export default CommonElement;
