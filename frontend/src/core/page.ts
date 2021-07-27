import CommonElement from './common-element';

abstract class Page extends CommonElement {
  build () {
    this.render();
  }
}

export default Page;
