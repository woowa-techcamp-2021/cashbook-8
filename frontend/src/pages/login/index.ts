import Page from '../../core/page';
import LoginView from '../../views/login';

class LoginPage extends Page {
  protected mount (): void {
    const loginView = new LoginView(this.$target);
    loginView.build();
  }
}

export default LoginPage;
