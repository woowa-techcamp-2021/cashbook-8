import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { CashHistoryData } from '../models/cash-history';
import { CategoriesData } from '../models/categories';
import { PaymentsData } from '../models/payments';
import categoryAPI from '../api/category';
import paymentAPI from '../api/payment';
import cashHistoryAPI from '../api/cash-history';
import { CashHistoryRequest } from '../types/cash-history';
import { FocusDateData } from '../models/focus-date';
import { CashHistoriesData } from '../models/cash-histories';
import { date2DatePickerFormat, date2yyyyMMdd } from '../utils/date';
import { Payment } from '../types/payment';
import { Category } from '../types/category';
import { CashHistories } from '../enums/cash-history.enum';
import { formatNumber } from '../utils/formatter';
import ConsoleView from '../views/console';
import toast from '../utils/toast/toast';

type ConsoleCashHistory = {
  id: number | null;
  payment: Payment | null;
  category: Category | null;
  content: string | null;
  price: number | null;
  createdAt: string;
}

class ConsoleViewModel extends ViewModel {
  private cashHistoryModel: CashHistoryData;
  private categoriesModel: CategoriesData;
  private paymentsModel: PaymentsData;
  private focusDateModel: FocusDateData;
  private cashHistoriesModel: CashHistoriesData;
  private _cashHistoryType: CashHistories = CashHistories.Income;

  constructor (view: View) {
    super(view);
    this.cashHistoryModel = models.cashHistory;
    this.categoriesModel = models.categories;
    this.paymentsModel = models.payments;
    this.focusDateModel = models.focusDate;
    this.cashHistoriesModel = models.cashHistories;

    this.setInitialDataInCashHistoryModel();
    this.fetchCategories();
    this.fetchPayments();
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_CASH_HISTORY_CHANGE, () => {
      if (this.isValidated()) {
        (this.view as ConsoleView).enableButton();
      } else {
        (this.view as ConsoleView).disableButton();
      }

      if (this.isWriting()) {
        (this.view as ConsoleView).showResetButton();
      } else {
        (this.view as ConsoleView).hiddenResetButton();
      }
    });

    pubsub.subscribe(actions.ON_CATEGORIES_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_PAYMENTS_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_CASH_HISTORY_SET, () => {
      this._cashHistoryType = this.cashHistory.category?.type ?? CashHistories.Income;
      this.view.build();
      if (this.isWriting()) {
        (this.view as ConsoleView).showResetButton();
      }
    });
  }

  private isWriting (): boolean {
    const { id, price, content, paymentId, categoryId } = this.cashHistoryModel;

    if (
      id !== null ||
      price !== null ||
      (content !== null && content.trim().length > 0) ||
      paymentId !== null ||
      categoryId !== null
    ) {
      return true;
    }

    return false;
  }

  initCashHistory (): void {
    this.setInitialDataInCashHistoryModel();
    pubsub.publish(actions.ON_CASH_HISTORY_SET);
  }

  private setInitialDataInCashHistoryModel (): void {
    this.cashHistoryModel.id = null;
    this.cashHistoryModel.price = null;
    this.cashHistoryModel.content = null;
    this.cashHistoryModel.createdAt = new Date();
    this.cashHistoryModel.categoryId = null;
    this.cashHistoryModel.paymentId = null;

    this._cashHistoryType = CashHistories.Income;
  }

  private async fetchCashHistories (): Promise<void> {
    const date = this.focusDateModel.focusDate;
    try {
      const histories = await cashHistoryAPI.fetchCashHistories(date.getFullYear(), date.getMonth() + 1);
      this.cashHistoriesModel.cashHistories = histories;
    } catch (error) {
      const { status } = error;

      if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  private async fetchCategories () {
    try {
      const categories = await categoryAPI.fetchCategories();
      this.categoriesModel.categories = categories;
    } catch (error) {
      const { status } = error;

      if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  private async fetchPayments () {
    try {
      const payments = await paymentAPI.fetchPayments();
      this.paymentsModel.payments = payments;
    } catch (error) {
      const { status } = error;

      if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  async createPayment (value: string): Promise<void> {
    try {
      await paymentAPI.createPayment(value);
      toast.success('결제수단을 추가했습니다');
      (this.view as ConsoleView).closeCreatePaymentModal();
      this.fetchPayments();
    } catch (error) {
      switch (error.status) {
        case 400:
          toast.error('양식을 확인해주세요');
          break;

        case 409:
          toast.error('같은 결제수단이 존재합니다');
          break;

        default:
          toast.error('다시 시도해주세요');
          break;
      }
    }
  }

  async createCategory (value: string, color?: string): Promise<void> {
    if (color === undefined) {
      toast.error('값을 확인해주세요');
      return;
    }

    try {
      await categoryAPI.createCategory(value, color, this.cashHistoryType);
      toast.success('카테고리를 추가했습니다');
      (this.view as ConsoleView).closeCreateCategoryModal();
      this.fetchCategories();
    } catch (error) {
      console.log('pass');
      switch (error.status) {
        case 400:
          toast.error('양식을 확인해주세요');
          break;

        case 409:
          toast.error('같은 카테고리가 존재합니다');
          break;

        default:
          toast.error('다시 시도해주세요');
          break;
      }
    }
  }

  async deleteCategory (id: string): Promise<void> {
    try {
      await categoryAPI.deleteCategory(Number(id));
      this.fetchCategories();
      toast.success('카테고리를 삭제했습니다');
    } catch (error) {
      const { status } = error;

      if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  async deletePayment (id: string): Promise<void> {
    try {
      await paymentAPI.deletePayment(Number(id));
      this.fetchPayments();
      toast.success('결제수단을 삭제했습니다');
    } catch (error) {
      const { status } = error;

      if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  createOrUpdate (): void {
    const { id, createdAt, content, paymentId, categoryId, price } = this.cashHistoryModel;
    if (!this.isValidated()) {
      return;
    }

    const cashHistory = {
      date: date2yyyyMMdd(createdAt),
      content,
      paymentId,
      categoryId,
      price
    } as CashHistoryRequest;

    if (id === null) {
      this.createCashHistory(cashHistory);
    } else {
      this.updateCashHistory(id, cashHistory);
    }

    this.initCashHistory();
  }

  async createCashHistory (cashHistoryRequest: CashHistoryRequest): Promise<void> {
    try {
      await cashHistoryAPI.createCashHistory(cashHistoryRequest);
      this.fetchCashHistories();
      toast.success('결제 내역을 추가했습니다');
    } catch (error) {
      const { status } = error;

      if (status === 400) {
        toast.error('양식을 확인해주세요');
      } else if (status === 404) {
        toast.error('새로고침 후 시도해주세요');
      } else if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  async updateCashHistory (id:number, cashHistoryRequest: CashHistoryRequest): Promise<void> {
    try {
      await cashHistoryAPI.updateCashHistory(id, cashHistoryRequest);
      this.fetchCashHistories();
      toast.success('결제 내역을 수정했습니다');
    } catch (error) {
      const { status } = error;

      if (status === 400) {
        toast.error('양식을 확인해주세요');
      } else if (status === 404) {
        toast.error('새로고침 후 시도해주세요');
      } else if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  get cashHistoryType (): CashHistories {
    return this._cashHistoryType;
  }

  get cashHistory (): ConsoleCashHistory {
    const { id, paymentId, categoryId, content, price, createdAt } = this.cashHistoryModel;
    const payment = this.payments.find((payment) => payment.id === paymentId) ?? null;
    const category = this.categoriesModel.categories?.categories
      ?.find((category) => category.id === categoryId) ?? null;

    return {
      id,
      payment,
      category,
      content,
      price,
      createdAt: date2DatePickerFormat(createdAt)
    };
  }

  get payments (): Payment[] | [] {
    return this.paymentsModel.payments?.payments ?? [];
  }

  get categories (): Category[] | [] {
    return this.categoriesModel.categories?.categories
      .filter(category => category.type === this.cashHistoryType) ?? [];
  }

  changeDate (date: string): void {
    this.cashHistoryModel.createdAt = new Date(date);
  }

  changeContent (content: string): void {
    this.cashHistoryModel.content = content;
  }

  changeCategory (categoryId?: string): void {
    this.cashHistoryModel.categoryId = categoryId !== undefined ? Number(categoryId) : null;
  }

  changePayment (paymentId?: string): void {
    this.cashHistoryModel.paymentId = paymentId !== undefined ? Number(paymentId) : null;
  }

  changePrice (price: string): void {
    const numberPrice = Number(price.replace(/,/gi, ''));
    this.cashHistoryModel.price = isNaN(numberPrice) || price === '' ? null : numberPrice;
  }

  changeCashHistoryType (type: CashHistories): boolean {
    if (type === this.cashHistoryType) {
      return false;
    }

    this._cashHistoryType = type;
    return true;
  }

  get formattedPrice (): string | null {
    const { price } = this.cashHistory;

    return price === null ? null : formatNumber(price);
  }

  isValidated (): boolean {
    const { price, content, paymentId, categoryId } = this.cashHistoryModel;
    if (
      price === null ||
      isNaN(Number(price)) ||
      content === null ||
      content.trim().length <= 0 ||
      paymentId === null ||
      categoryId === null
    ) {
      return false;
    }

    return true;
  }
}

export default ConsoleViewModel;
