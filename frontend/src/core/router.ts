import Notfound from '../pages/not-found';
import { parsePath } from '../utils/path';

const ROUTER_PATH = {
  NOT_FOUND: '/notfound'
};

class Router {
  private routes: { [key: string]: any };
  private $root: HTMLElement;

  constructor ($root: HTMLElement) {
    this.$root = $root;
    this.routes = {
      [ROUTER_PATH.NOT_FOUND]: new Notfound($root)
    };
  }

  listen () {
    window.addEventListener('popstate', this.onStateChange.bind(this));
  }

  private onStateChange () {
    const path = parsePath(location.pathname);
    if (!(path in this.routes)) {
      this.push(ROUTER_PATH.NOT_FOUND);
      return;
    }

    this.routes[path].render();
  }

  push (path: string) {
    history.pushState({}, '', path);
    this.onStateChange();
  }
};

export default Router;
