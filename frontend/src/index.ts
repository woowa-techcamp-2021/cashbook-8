import Router from './core/router';
import { $ } from './utils/selector';

import './assets/styles/reset.css';
import './assets/styles/common.css';

const $root = $('#root');

Router.init($root as HTMLElement);
Router.instance.listen();
