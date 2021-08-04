import CalendarPage from '../pages/calendar';
import ChartPage from '../pages/chart';
import LoginPage from '../pages/login';
import MainPage from '../pages/main';
import NotfoundPage from '../pages/notfound';
import { parsePath } from '../utils/path';
import Page from './page';
import pubsub from './pubsub';

export const ROUTER_PATH = {
  MAIN: '',
  LOGIN: 'login',
  CALENDAR: 'calendar',
  CHART: 'chart',
  NOT_FOUND: 'notfound'
};

class Router {
  private routes: { [key: string]: Page };
  private static _router: Router;

  static init ($root: HTMLElement): void {
    this._router = new Router($root);
  }

  static get instance (): Router {
    return this._router;
  }

  private constructor ($root: HTMLElement) {
    this.routes = {
      [ROUTER_PATH.MAIN]: new MainPage($root),
      [ROUTER_PATH.CALENDAR]: new CalendarPage($root),
      [ROUTER_PATH.LOGIN]: new LoginPage($root),
      [ROUTER_PATH.CHART]: new ChartPage($root),
      [ROUTER_PATH.NOT_FOUND]: new NotfoundPage($root)
    };
    this.onStateChange();
  }

  listen (): void {
    window.addEventListener('popstate', this.onStateChange.bind(this));
  }

  private onStateChange () {
    const path = parsePath(location.pathname);
    pubsub.clear();
    if (!(path in this.routes)) {
      this.routes[ROUTER_PATH.NOT_FOUND].build();
      return;
    }
    this.routes[path].build();
  }

  push (path: string): void {
    // todo: 필요 시 state 추가
    history.pushState({ }, '', `/${path}`);
    this.onStateChange();
  }
}

export default Router;
