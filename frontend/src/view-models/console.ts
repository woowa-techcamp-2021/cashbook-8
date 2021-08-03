import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { CashHistoryData } from '../models/cash-history';
import { CategoriesData } from '../models/categories';
import { PaymentsData } from '../models/payments';
import CategoryAPI from '../api/category';
import PaymentAPI from '../api/payment';
import CashHistoryAPI from '../api/cash-history';
import { CashHistoryRequest } from '../types/cash-history';
import { FocusDateData } from '../models/focus-date';
import { CashHistoriesData } from '../models/cash-histories';

class ConsoleViewModel extends ViewModel {
  private cashHistoryModel: CashHistoryData;
  private categoriesModel: CategoriesData;
  private paymentsModel: PaymentsData;
  private focusDateModel: FocusDateData;
  private filteredCashHistoriesModel: CashHistoriesData;

  constructor (view: View) {
    super(view);
    this.cashHistoryModel = models.cashHistory;
    this.categoriesModel = models.categories;
    this.paymentsModel = models.payments;
    this.focusDateModel = models.focusDate;
    this.filteredCashHistoriesModel = models.filteredCashHistories;

    this.fetchCategories();
    this.fetchPayments();
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_CASH_HISTORY_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_CATEGORIES_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_PAYMENTS_CHANGE, () => {
      this.view.build();
    });
  }

  async fetchCashHistories (): Promise<void> {
    const date = this.focusDateModel.focusDate;
    const histories = await CashHistoryAPI.fetchCashHistories(date.getFullYear(), date.getMonth() + 1);
    this.filteredCashHistoriesModel.cashHistories = histories;
  }

  onCategorySelect (e: Event): void {
    const selectedCategoryModelName = (e.target as HTMLElement).dataset.name;
    if (this.categoriesModel.categories === null) {
      return;
    }
    this.categoriesModel.categories.categories.forEach(e => {
      if (e.name === selectedCategoryModelName) {
        if (this.cashHistoryModel.cashHistory === null) {
          return;
        }
        this.cashHistoryModel.cashHistory = {
          ...this.cashHistoryModel.cashHistory,
          category: e
        };
      }
    });
  }

  onPaymentSelect (e: Event): void {
    const selectedPaymentModelName = (e.target as HTMLElement).dataset.name;
    if (this.paymentsModel.payments === null) {
      return;
    }
    this.paymentsModel.payments.payments.forEach(e => {
      if (e.name === selectedPaymentModelName) {
        if (this.cashHistoryModel.cashHistory === null) {
          return;
        }
        this.cashHistoryModel.cashHistory = {
          ...this.cashHistoryModel.cashHistory,
          payment: e
        };
      }
    });
  }

  onContentChange (e: Event): void {
    if (this.cashHistoryModel.cashHistory === null) {
      return;
    }
    this.cashHistoryModel.cashHistory = {
      ...this.cashHistoryModel.cashHistory,
      content: (e.target as HTMLInputElement).value
    };
  }

  onPriceChange (e: Event): void {
    if (this.cashHistoryModel.cashHistory === null) {
      return;
    }
    this.cashHistoryModel.cashHistory = {
      ...this.cashHistoryModel.cashHistory,
      price: Number((e.target as HTMLInputElement).value)
    };
    console.log(this.cashHistoryModel.cashHistory?.price);
  }

  private async fetchCategories () {
    const categories = await CategoryAPI.fetchCategories();
    this.categoriesModel.categories = categories;
  }

  private async fetchPayments () {
    const payments = await PaymentAPI.fetchPayments();
    this.paymentsModel.payments = payments;
  }

  async createCashHistory (cashHistoryRequest: CashHistoryRequest): Promise<void> {
    await CashHistoryAPI.createCashHistory(cashHistoryRequest);
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.fetchCashHistories();
  }

  async updateCashHistory (id:number, cashHistoryRequest: CashHistoryRequest): Promise<void> {
    await CashHistoryAPI.updateCashHistory(id, cashHistoryRequest);
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.fetchCashHistories();
  }

  get cashHistory (): CashHistoryData {
    return this.cashHistoryModel;
  }

  set cashHistory (cashHistory: CashHistoryData) {
    this.cashHistoryModel = cashHistory;
  }

  get categories (): CategoriesData {
    return this.categoriesModel;
  }

  get payments (): PaymentsData {
    return this.paymentsModel;
  }
}

export default ConsoleViewModel;
