import Page from '../../core/page';

class MainPage extends Page {
  protected render () {
    this.$target.innerHTML = `
      <div>메인 페이지</div>
    `;
  }
}

export default MainPage;
