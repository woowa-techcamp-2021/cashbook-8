import CommonElement from './common-element';

abstract class View extends CommonElement {
  build (): void {
    this.render();
    this.mount();
    this.addListener();
  }

  protected abstract addListener (): void;
  protected abstract render(): void;
}

export default View;
