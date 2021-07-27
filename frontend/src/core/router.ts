import { parsePath } from '../utils/path';
import HeaderView from '../views/header';
import Page from './page';

const ROUTER_PATH = {
  NOT_FOUND: '/notfound'
};

class Router {
  private routes: { [key: string]: Page };
  private $root: HTMLElement;

  constructor ($root: HTMLElement) {
    this.$root = $root;
    this.routes = {
      [ROUTER_PATH.NOT_FOUND]: new HeaderView($root)
    };
  }

  listen () {
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

  push (path: string) {
    // todo: 필요 시 state 추가
    history.pushState({}, '', path);
    this.onStateChange();
  }
};

export default Router;
