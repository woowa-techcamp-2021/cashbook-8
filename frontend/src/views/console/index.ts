import View from '../../core/view';
import DropDownUIElement from '../../ui-elements/drop-down';
import { date2yyyyMMdd } from '../../utils/date';
import { $ } from '../../utils/selector';
import ConsoleViewModel from '../../view-models/console';
import { CashHistories } from '../../enums/cash-history.enum';

import './index.css';

class ConsoleView extends View {
  private consoleViewModel: ConsoleViewModel;
  private categoryDropDownUIElement?: DropDownUIElement;
  private paymentDropDownUIElement?: DropDownUIElement;
  private isCategoryDropDownVisible: boolean;
  private isPaymentDropDownVisible: boolean;

  constructor ($target: HTMLElement) {
    super($target);
    this.consoleViewModel = new ConsoleViewModel(this);
    this.isCategoryDropDownVisible = false;
    this.isPaymentDropDownVisible = false;
  }

  onCreateClick (): void {
    console.log(this.consoleViewModel);
    if (this.consoleViewModel.cashHistory.cashHistory === null) {
      return;
    }
    const { price, content, category, payment } = this.consoleViewModel.cashHistory.cashHistory;
    const { id } = this.consoleViewModel.cashHistory.cashHistory;
    const cashHistoryRequest = {
      date: date2yyyyMMdd(new Date()),
      price,
      content,
      categoryId: category.id,
      paymentId: payment.id
    };
    if (id === 0) {
      this.consoleViewModel.createCashHistory(cashHistoryRequest);
    } else {
      this.consoleViewModel.updateCashHistory(id, cashHistoryRequest);
    }
  }

  onCategorySelectClick (): void {
    this.isCategoryDropDownVisible = !this.isCategoryDropDownVisible;
    if (this.isCategoryDropDownVisible) {
      this.categoryDropDownUIElement?.show();
    } else {
      this.categoryDropDownUIElement?.hide();
    }
  }

  onPaymentSelectClick (): void {
    this.isPaymentDropDownVisible = !this.isPaymentDropDownVisible;
    if (this.isPaymentDropDownVisible) {
      this.paymentDropDownUIElement?.show();
    } else {
      this.paymentDropDownUIElement?.hide();
    }
  }

  protected addListener (): void {
    $('.console__input--content')?.addEventListener('blur', this.consoleViewModel.onContentChange.bind(this.consoleViewModel));
    $('.console__input--price')?.addEventListener('blur', this.consoleViewModel.onPriceChange.bind(this.consoleViewModel));
    $('.console__button')?.addEventListener('click', this.onCreateClick.bind(this));
    $('.console__select--category')?.addEventListener('click', this.onCategorySelectClick.bind(this));
    $('.console__select--payment')?.addEventListener('click', this.onPaymentSelectClick.bind(this));
  }

  protected render (): void {
    if (this.consoleViewModel.cashHistory.cashHistory === null) {
      const INIT_NUM = 0;
      const INIT_STR = '';

      this.consoleViewModel.cashHistory.cashHistory = {
        id: INIT_NUM,
        price: INIT_NUM,
        content: INIT_STR,
        type: CashHistories.Income,
        category: { id: INIT_NUM, name: INIT_STR, color: INIT_STR, userId: INIT_NUM, type: CashHistories.Income },
        payment: { id: INIT_NUM, name: INIT_STR, userId: INIT_NUM },
        userId: INIT_NUM,
        categoryId: INIT_NUM,
        paymentId: INIT_NUM,
        createdAt: INIT_STR
      };
    }
    const { id, category, content, payment, price } = this.consoleViewModel.cashHistory.cashHistory;
    this.$target.innerHTML = `
    <div class="console__container">
    <div class="console__column">
      <div class="console__title">일자</div>
      <input class="console__input" placeholder="입력하세요" value="${date2yyyyMMdd(new Date())}" />
    </div>
    <div class="console__column">
      <div class="console__title">분류</div>
      <div class="console__select-container">
        <div class="console__select--category">${category.name || '선택하세요'}</div>
        <div></div>
        <i class="console__select-arrow wci wci-chevron-down"></i>
      </div>
    </div>
    <div class="console__column wide">
      <div class="console__title">내용</div>
      <input class="console__input console__input--content" placeholder="입력하세요" value="${content}" />
    </div>
    <div class="console__column">
      <div class="console__title">결제수단</div>
      <div class="console__select-container">
        <div class="console__select--payment">${payment.name || '선택하세요'}</div>
        <i class="console__select-arrow wci wci-chevron-down"></i>
      </div>
    </div>
    <div class="console__column no-border wide">
      <div class="console__title">금액</div>
      <div class="console__price-box">
        <div class="console__type display-none">+</div>
        <div class="console__type">-</div>
        <input class="console__input console__input--price" placeholder="입력하세요" value="${price <= 0 ? '' : price}" />
        <div class="console__text">원</div>
      </div>
    </div>
    <div class="console__button">
      <i class="wci wci-check"></i>
    </div>
  </div>
    `;
  }

  protected mount (): void {
    const $category = $('.console__select--category');
    if ($category !== null) {
      if (this.consoleViewModel.categories.categories === null) {
        return;
      }
      this.categoryDropDownUIElement = new DropDownUIElement($category, this.consoleViewModel.categories.categories.categories.map(e => e.name), (e) => {
        this.consoleViewModel.onCategorySelect(e);
        this.categoryDropDownUIElement?.hide();
        e.stopPropagation();
      });
      this.categoryDropDownUIElement.build();
      this.isCategoryDropDownVisible = false;
    }

    const $payment = $('.console__select--payment');
    if ($payment !== null) {
      if (this.consoleViewModel.payments.payments === null) {
        return;
      }
      this.paymentDropDownUIElement = new DropDownUIElement($payment, this.consoleViewModel.payments.payments.payments.map(e => e.name), (e) => {
        this.consoleViewModel.onPaymentSelect(e);
        this.paymentDropDownUIElement?.hide();
        e.stopPropagation();
      });
      this.paymentDropDownUIElement.build();
      this.isPaymentDropDownVisible = false;
    }
  }
}

export default ConsoleView;
