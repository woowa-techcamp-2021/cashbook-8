import Page from '../../core/page';

class NotfoundPage extends Page {
  protected render () {
    this.$target.innerHTML = `
      <div class="notfound">
        <h1 class="notfound__title">Notfound</h1>
      </div>
    `;
  }
}

export default NotfoundPage;
