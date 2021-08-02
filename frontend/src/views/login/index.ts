import View from '../../core/view';
import { $ } from '../../utils/selector';
import LoginViewModel from '../../view-models/login';

class LoginView extends View {
  private loginViewModel: LoginViewModel;

  constructor ($target: HTMLElement) {
    super($target);
    this.loginViewModel = new LoginViewModel(this);
  }

  protected addListener (): void {
    $('.login__button--github')?.addEventListener('click', this.loginViewModel.onGithubLoginClicked);
  }

  protected render (): void {
    this.$target.innerHTML = `
      <div class="login">
        <div class="login__button login__button--github">
          Github으로 로그인
        </div>
      </div>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default LoginView;
