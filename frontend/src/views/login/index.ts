import View from '../../core/view';
import { $ } from '../../utils/selector';
import LoginViewModel from '../../view-models/login';
import github from '../../assets/svg/github.svg';

import './index.css';

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
        <h1 class="login__title">로그인</h1>
        <div class="login__button login__button--github">
          <img src="${github}"/>
          <span>Github으로 계속하기</span>
        </div>
      </div>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default LoginView;
