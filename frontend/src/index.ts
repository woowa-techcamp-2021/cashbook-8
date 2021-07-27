import Router from './core/router';
import { $ } from './utils/selector';

const $root = $('#root');

const router = new Router($root as HTMLElement);
router.listen();
