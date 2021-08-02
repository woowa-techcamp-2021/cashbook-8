import CommonElement from './common-element';

abstract class Page extends CommonElement {
  build (): void {
    this.mount();
  }

  protected render (): void {
    // 페이지는 render 사용을 지양합니다
  }
}

export default Page;
