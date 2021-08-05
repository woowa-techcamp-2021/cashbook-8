import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { CashHistoriesData } from '../models/cash-histories';
import { FocusDateData } from '../models/focus-date';
import { CashHistoriesInDay } from '../types/cash-history';
import cashHistoryAPI from '../api/cash-history';
import { CashHistoryData } from '../models/cash-history';
import { CashHistories } from '../enums/cash-history.enum';
import toast from '../utils/toast/toast';

class MainViewModel extends ViewModel {
  private focusDateModel: FocusDateData;
  private cashHistoriesModel: CashHistoriesData;
  private filteredCashHistoriesModel: CashHistoriesData;
  private cashHistoryModel: CashHistoryData;
  private selectedFilter: CashHistories[] = [CashHistories.Income, CashHistories.Expenditure];

  constructor (view: View) {
    super(view);
    this.focusDateModel = models.focusDate;
    this.cashHistoriesModel = models.cashHistories;
    this.filteredCashHistoriesModel = models.filteredCashHistories;
    this.cashHistoryModel = models.cashHistory;
    this.fetchCashHistories();
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_FOCUS_DATE_CHANGE, () => {
      this.fetchCashHistories()
        .then(() => {
          this.applyFilter();
        });
    });

    pubsub.subscribe(actions.ON_CASH_HISTORIES_CHANGE, () => {
      this.applyFilter();
    });

    pubsub.subscribe(actions.ON_FILTERED_CASH_HISTORIES_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_CATEGORIES_CHANGE, () => {
      this.fetchCashHistories();
    });

    pubsub.subscribe(actions.ON_PAYMENTS_CHANGE, () => {
      this.fetchCashHistories();
    });
  }

  async fetchCashHistories (): Promise<void> {
    const date = this.focusDateModel.focusDate;

    try {
      const histories = await cashHistoryAPI.fetchCashHistories(date.getFullYear(), date.getMonth() + 1);
      this.cashHistoriesModel.cashHistories = histories;
      this.filteredCashHistoriesModel.cashHistories = histories;
    } catch (error) {
      const { status } = error;

      if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  applyFilter (): void {
    const { cashHistories } = this.cashHistoriesModel;
    if (cashHistories === null) {
      return;
    }

    const filtered = cashHistories.cashHistories.groupedCashHistories.map((monthlyCashHistory) => ({
      ...monthlyCashHistory,
      cashHistories: monthlyCashHistory.cashHistories.filter(e => this.selectedFilter.includes(e.type))
    }));

    this.filteredCashHistoriesModel.cashHistories = {
      ...cashHistories,
      cashHistories: {
        ...cashHistories.cashHistories,
        groupedCashHistories: filtered
      }
    };
  }

  filterButtonClick (isIncomeChecked: boolean, isExpenditureChecked: boolean): void {
    this.selectedFilter = [];

    if (isIncomeChecked) {
      this.selectedFilter.push(CashHistories.Income);
    }

    if (isExpenditureChecked) {
      this.selectedFilter.push(CashHistories.Expenditure);
    }

    this.applyFilter();
  }

  onCashHistoryClick (e:Event): void {
    const cashHistoryId = Number((e.target as HTMLElement).dataset.id);
    if (cashHistoryId !== undefined) {
      this.filteredCashHistoriesModel.cashHistories?.cashHistories.groupedCashHistories
        .forEach(groupedCashHistory => groupedCashHistory.cashHistories
          .forEach(cashHistory => {
            if (cashHistory.id === cashHistoryId) {
              this.cashHistoryModel.id = cashHistory.id;
              this.cashHistoryModel.categoryId = cashHistory.categoryId;
              this.cashHistoryModel.paymentId = cashHistory.paymentId;
              this.cashHistoryModel.content = cashHistory.content;
              this.cashHistoryModel.price = cashHistory.price;
              this.cashHistoryModel.createdAt = new Date(cashHistory.createdAt);
              pubsub.publish(actions.ON_CASH_HISTORY_SET);
            }
          }));
    }
  }

  get cashHistoryCount (): number {
    const cashHistories = this.filteredCashHistoriesModel.cashHistories;

    if (cashHistories === null) {
      return 0;
    }
    const count = cashHistories.cashHistories.groupedCashHistories.reduce((count, cashHistoryInDay) => {
      return count + cashHistoryInDay.cashHistories.length;
    }, 0);
    return count;
  }

  get cashHistories (): CashHistoriesInDay[] | undefined {
    return this.filteredCashHistoriesModel.cashHistories?.cashHistories.groupedCashHistories;
  }

  get incomeTotalPrice (): number {
    const { cashHistories } = this.cashHistoriesModel;

    if (cashHistories === null) {
      return 0;
    }

    return cashHistories.cashHistories.totalIncome;
  }

  get expenditureTotalPrice (): number {
    const { cashHistories } = this.cashHistoriesModel;

    if (cashHistories === null) {
      return 0;
    }

    return cashHistories.cashHistories.totalExpenditure;
  }
}

export default MainViewModel;
