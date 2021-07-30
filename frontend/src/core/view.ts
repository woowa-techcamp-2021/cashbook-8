import CommonElement from './common-element';

abstract class View extends CommonElement {
  protected addListener (): void {
    // listen 할 DOM 이벤트 등록
  }

  build (): void {
    this.render();
    this.mount();
    this.addListener();
  }

  protected abstract render(): void;
}

export default View;
