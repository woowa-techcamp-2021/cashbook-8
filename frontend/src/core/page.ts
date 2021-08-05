import CommonElement from './common-element';

abstract class Page extends CommonElement {
  build (): void {
    this.render();
    this.mount();
  }

  protected abstract render (): void;
}

export default Page;
