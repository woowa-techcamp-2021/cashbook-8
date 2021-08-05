import { $ } from '../selector';
import './toast.css';

const DISAPPEAR_MS = 50000;

type ToastTypeData = {
  title: string;
  className: string;
}

const TOAST_TYPES: { [key: string]: ToastTypeData } = {
  info: {
    title: '알림',
    className: 'info'
  },
  success: {
    title: '성공',
    className: 'success'
  },
  error: {
    title: '실패',
    className: 'error'
  }
};

const toast = () => {
  const $toast = $('#toast');
  if ($toast === null) {
    throw new Error('toast 요소가 정의되지 않음');
  }

  let timer: NodeJS.Timeout | null = null;

  const hidden = () => {
    $toast.classList.remove('appear');
    $toast.innerHTML = '';
  };

  const show = (typeData: ToastTypeData, message: string) => {
    timer && clearTimeout(timer);

    $toast.innerHTML = `
      <div class="toast__content ${typeData.className}">
        <h1>${typeData.title}</h1>
        <span>${message}</span>
      </div>
    `;
    $toast.classList.add('appear');

    timer = setTimeout(() => {
      hidden();
    }, DISAPPEAR_MS);
  };

  return {
    info (message: string) {
      show(TOAST_TYPES.info, message);
    },
    success (message: string) {
      show(TOAST_TYPES.success, message);
    },
    error (message: string) {
      show(TOAST_TYPES.error, message);
    }
  };
};

export default toast();
