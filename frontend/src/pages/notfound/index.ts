import Page from '../../core/page';
import NotfoundView from '../../views/notfound';

class NotfoundPage extends Page {
  protected render (): void {
    // no render
  }

  protected mount (): void {
    const notfoundView = new NotfoundView(this.$target);
    notfoundView.build();
  }

  protected render (): void {
    // no render
  }
}

export default NotfoundPage;
