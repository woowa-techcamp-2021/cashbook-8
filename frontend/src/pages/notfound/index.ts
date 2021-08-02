import Page from '../../core/page';
import NotfoundView from '../../views/notfound';

class NotfoundPage extends Page {
  protected mount (): void {
    const notfoundView = new NotfoundView(this.$target);
    notfoundView.build();
  }
}

export default NotfoundPage;
