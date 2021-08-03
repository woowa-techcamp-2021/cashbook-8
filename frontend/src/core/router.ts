import CalendarPage from '../pages/calendar';
import LoginPage from '../pages/login';
import MainPage from '../pages/main';
import NotfoundPage from '../pages/notfound';
import { parsePath } from '../utils/path';
import Page from './page';

const ROUTER_PATH = {
  MAIN: '',
  LOGIN: 'login',
  CALENDAR: 'calendar',
  NOT_FOUND: 'notfound'
};

class Router {
  private routes: { [key: string]: Page };
  private $root: HTMLElement;

  constructor ($root: HTMLElement) {
    this.$root = $root;
    this.routes = {
      [ROUTER_PATH.MAIN]: new MainPage($root),
      [ROUTER_PATH.CALENDAR]: new CalendarPage($root),
      [ROUTER_PATH.LOGIN]: new LoginPage($root),
      [ROUTER_PATH.NOT_FOUND]: new NotfoundPage($root)
    };
    this.onStateChange();
  }

  listen (): void {
    window.addEventListener('popstate', this.onStateChange.bind(this));
  }

  private onStateChange () {
    const path = parsePath(location.pathname);
    if (!(path in this.routes)) {
      this.routes[ROUTER_PATH.NOT_FOUND].build();
      return;
    }
    this.routes[path].build();
  }

  push (path: string): void {
    // todo: 필요 시 state 추가
    history.pushState({}, '', path);
    this.onStateChange();
  }
}

export default Router;
