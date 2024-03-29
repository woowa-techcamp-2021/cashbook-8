import View from '../../core/view';
import { CashHistories } from '../../enums/cash-history.enum';
import DropDownUIElement from '../../ui-elements/drop-down';
import InputModal from '../../ui-elements/input-modal';
import { $ } from '../../utils/selector';
import ConsoleViewModel from '../../view-models/console';

import './index.css';
class ConsoleView extends View {
  private consoleViewModel: ConsoleViewModel;
  categoryDropDown?: DropDownUIElement;
  private createCategoryModal?: InputModal;
  private createPaymentModal?: InputModal;
  private deletePaymentModal?: InputModal;
  private deleteCategoryModal?: InputModal;

  constructor ($target: HTMLElement) {
    super($target);
    this.consoleViewModel = new ConsoleViewModel(this);
  }

  onSubmitClicked (): void {
    this.consoleViewModel.createOrUpdate();
  }

  closeCreateCategoryModal (): void {
    this.createCategoryModal?.close();
  }

  closeCreatePaymentModal (): void {
    this.createPaymentModal?.close();
  }

  showResetButton (): void {
    $('.console__reset')?.classList.remove('disappear');
    $('.console__reset')?.classList.add('appear');
  }

  hiddenResetButton (): void {
    $('.console__reset')?.classList.remove('appear');
    $('.console__reset')?.classList.add('disappear');
  }

  enableButton (): void {
    $('.console__button')?.classList.add('console__button--active');
  }

  disableButton (): void {
    $('.console__button')?.classList.remove('console__button--active');
  }

  private onTypeClicked (type: CashHistories): void {
    const isChanged = this.consoleViewModel.changeCashHistoryType(type);
    if (isChanged && this.categoryDropDown) {
      this.categoryDropDown.selected = undefined;
      this.categoryDropDown.items = this.consoleViewModel.categories.map(category => {
        return {
          value: category.id.toString(),
          label: category.name
        };
      });
      this.categoryDropDown.build();
    }
  }

  private onIncomeTypeClicked (): void {
    $('.console__type--income')?.classList.add('selected');
    $('.console__type--expenditure')?.classList.remove('selected');
    this.onTypeClicked(CashHistories.Income);
  }

  private onExpenditureTypeClicked (): void {
    $('.console__type--expenditure')?.classList.add('selected');
    $('.console__type--income')?.classList.remove('selected');
    this.onTypeClicked(CashHistories.Expenditure);
  }

  private onDateChanged (e: Event): void {
    const { value } = e.target as HTMLInputElement;
    this.consoleViewModel.changeDate(value);
  }

  private onContentChanged (e: Event): void {
    const { value } = e.target as HTMLInputElement;
    this.consoleViewModel.changeContent(value);
  }

  private onPriceChanged (e: Event): void {
    const target = e.target as HTMLInputElement;
    this.consoleViewModel.changePrice(target.value);
    target.value = this.consoleViewModel.formattedPrice ?? '';
  }

  private openCreateCategoryModal () {
    this.createCategoryModal?.open();
  }

  private openCreatePaymentModal () {
    this.createPaymentModal?.open();
  }

  private openDeleteCategoryModal (id: string) {
    const category = this.consoleViewModel.categories.find(category => category.id === Number(id));

    this.deleteCategoryModal?.open(id, category?.name);
  }

  private openDeletePaymentModal (id: string) {
    const payment = this.consoleViewModel.payments.find(payment => payment.id === Number(id));

    this.deletePaymentModal?.open(id, payment?.name);
  }

  private onResetClicked () {
    this.consoleViewModel.initCashHistory();
    this.hiddenResetButton();
  }

  protected addListener (): void {
    $('.console__type--income')?.addEventListener('click', this.onIncomeTypeClicked.bind(this));
    $('.console__type--expenditure')?.addEventListener('click', this.onExpenditureTypeClicked.bind(this));
    $('.console__input--date')?.addEventListener('change', this.onDateChanged.bind(this));
    $('.console__input--price')?.addEventListener('input', this.onPriceChanged.bind(this));
    $('.console__input--content')?.addEventListener('input', this.onContentChanged.bind(this));
    $('.console__button')?.addEventListener('click', this.onSubmitClicked.bind(this));
    $('.console__reset')?.addEventListener('click', this.onResetClicked.bind(this));
  }

  protected render (): void {
    const { content, createdAt } = this.consoleViewModel.cashHistory;
    const { cashHistoryType, formattedPrice } = this.consoleViewModel;

    this.$target.innerHTML = `
    <div class="console-wrapper">
      <div class="console">
        <div class="console__column console__column--type">
          <div class="console__type console__type--income ${cashHistoryType === CashHistories.Income && 'selected'}">수입</div>
          <div class="console__type console__type--expenditure ${cashHistoryType === CashHistories.Expenditure && 'selected'}">지출</div>
        </div>

        <div class="console__column console__column--date">
          <div class="console__title">일자</div>
          <input class="console__input console__input--date" type="date" placeholder="입력하세요" value="${createdAt}" />
        </div>

        <div class="console__column console__column--category">
        </div>

        <div class="console__column console__column--content">
          <div class="console__title">내용</div>
          <input class="console__input console__input--content" placeholder="입력하세요" value="${content ?? ''}" />
        </div>

        <div class="console__column  console__column--payment">
        </div>

        <div class="console__column">
          <div class="console__title">금액</div>
          <div class="console__price-box">
            <input class="console__input console__input--price" placeholder="입력하세요" value="${formattedPrice ?? ''}" />
            <div class="console__unit-text">원</div>
          </div>
        </div>

        <div class="console__column console__column--confirm">
          <div class="console__button">
            <i class="wci wci-check"></i>
          </div>
        </div>
      </div>

      <div class="console__reset disappear">
        <i class="wci wci-close"></i>
      </div>
    </div>
    `;
  }

  protected mount (): void {
    const $categoryConsoleColumn = $('.console__column--category');
    if ($categoryConsoleColumn !== null) {
      this.categoryDropDown = new DropDownUIElement($categoryConsoleColumn, {
        onDeleteClicked: this.openDeleteCategoryModal.bind(this),
        onCreateClicked: this.openCreateCategoryModal.bind(this),
        initial: this.consoleViewModel.cashHistory.category?.id.toString(),
        onChange: this.consoleViewModel.changeCategory.bind(this.consoleViewModel),
        title: '분류',
        items: this.consoleViewModel.categories.map((category) => {
          return {
            value: category.id.toString(),
            label: category.name
          };
        }) ?? []
      });
      this.categoryDropDown.build();
    }

    const $paymentConsoleColumn = $('.console__column--payment');
    if ($paymentConsoleColumn !== null) {
      new DropDownUIElement($paymentConsoleColumn, {
        onDeleteClicked: this.openDeletePaymentModal.bind(this),
        onCreateClicked: this.openCreatePaymentModal.bind(this),
        initial: this.consoleViewModel.cashHistory.payment?.id.toString(),
        onChange: this.consoleViewModel.changePayment.bind(this.consoleViewModel),
        title: '결제수단',
        items: this.consoleViewModel.payments.map((payment) => {
          return {
            value: payment.id.toString(),
            label: payment.name
          };
        }) ?? []
      }).build();
    }

    this.createCategoryModal = new InputModal(this.$target, {
      title: '추가할 카테고리를 입력해주세요',
      placeholder: '입력하세요',
      confirm: this.consoleViewModel.createCategory.bind(this.consoleViewModel),
      hasColorPickerInput: true
    });
    this.createCategoryModal.build();

    this.createPaymentModal = new InputModal(this.$target, {
      title: '추가할 결제수단을 입력해주세요',
      placeholder: '입력하세요',
      confirm: this.consoleViewModel.createPayment.bind(this.consoleViewModel),
      hasColorPickerInput: false
    });
    this.createPaymentModal.build();

    this.deleteCategoryModal = new InputModal(this.$target, {
      title: '해당 카테고리를 삭제하시겠습니까?',
      placeholder: '',
      isDisabled: true,
      confirm: this.consoleViewModel.deleteCategory.bind(this.consoleViewModel),
      hasColorPickerInput: false
    });
    this.deleteCategoryModal.build();

    this.deletePaymentModal = new InputModal(this.$target, {
      title: '해당 결제수단을 삭제하시겠습니까?',
      placeholder: '',
      isDisabled: true,
      confirm: this.consoleViewModel.deletePayment.bind(this.consoleViewModel),
      hasColorPickerInput: false
    });
    this.deletePaymentModal.build();
  }
}

export default ConsoleView;
