import Router from './core/router';
import { $ } from './utils/selector';

import './assets/styles/reset.css';
import './assets/styles/common.css';

const $root = $('#root');

const router = new Router($root as HTMLElement);
router.listen();
