import CommonElement from './common-element';

abstract class View extends CommonElement {
  protected addListener () {}

  build () {
    this.render();
    this.mount();
    this.addListener();
  }

  protected abstract render(): void;
}

export default View;
