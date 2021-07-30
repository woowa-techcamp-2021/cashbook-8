import CommonElement from './common-element';

abstract class Page extends CommonElement {
  build (): void {
    this.render();
  }
}

export default Page;
