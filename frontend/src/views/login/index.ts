import View from '../../core/view';
import { $ } from '../../utils/selector';
import LoginViewModel from '../../view-models/login';
import github from '../../assets/svg/github.svg';
import guest from '../../assets/images/guest.png';
import background from '../../assets/images/login-background.png';

import './index.css';

class LoginView extends View {
  private loginViewModel: LoginViewModel;

  constructor ($target: HTMLElement) {
    super($target);
    this.loginViewModel = new LoginViewModel(this);
    this.createBackgroundBall();
  }

  createBackgroundBall (): void {
    const colors = ['var(--primary1)', 'var(--primary2)', 'var(--off-white)', '#817DCE', '#4CA1DE'];

    const numBalls = 5;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      const ball = document.createElement('div');
      ball.classList.add('ball');
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
      ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
      ball.style.transform = `scale(${Math.random()})`;
      ball.style.width = `${Math.random() * 7}em`;
      ball.style.height = ball.style.width;

      balls.push(ball);
      document.body.append(ball);
    }

    balls.forEach((el, i) => {
      const to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
      };

      el.animate(
        [
          { transform: 'translate(0, 0)' },
          { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
          duration: (Math.random() + 1) * 2000, // random duration
          direction: 'alternate',
          fill: 'both',
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    });
  }

  protected addListener (): void {
    $('.login__button--github')?.addEventListener('click', this.loginViewModel.onGithubLoginClicked);
    $('.login__button--guest')?.addEventListener('click', this.loginViewModel.onGuestLoginClicked);
  }

  protected render (): void {
    this.$target.innerHTML = `
      <div class="login">
        <div class="login__left">
          <div class="login__button login__button--guest">
            <img src="${guest}"/>
            <span>Guest로 입장하기</span>
          </div>
          <div class="login__button login__button--github">
            <img src="${github}"/>
            <span>Github으로 계속하기</span>
          </div>
        </div>
        <div class="login__right">
          <img class="login__background" src="${background}"/>
          
        </div>
      </div>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default LoginView;
