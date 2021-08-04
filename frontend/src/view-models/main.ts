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

class MainViewModel extends ViewModel {
  private focusDateModel: FocusDateData;
  private cashHistoriesModel: CashHistoriesData;
  private filteredCashHistoriesModel: CashHistoriesData;
  private cashHistoryModel: CashHistoryData;

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
      this.fetchCashHistories();
    });

    pubsub.subscribe(actions.ON_CASH_HISTORIES_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_FILTERED_CASH_HISTORIES_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_CASH_HISTORY_CHANGE, () => {
      this.view.build();
    });
  }

  async fetchCashHistories (): Promise<void> {
    const date = this.focusDateModel.focusDate;
    const histories = await cashHistoryAPI.fetchCashHistories(date.getFullYear(), date.getMonth() + 1);
    this.cashHistoriesModel.cashHistories = histories;
    this.filteredCashHistoriesModel.cashHistories = histories;
  }

  filterData (type: number): void {
    const { cashHistories } = this.cashHistoriesModel;
    if (cashHistories === null) {
      return;
    }

    const filtered = cashHistories.cashHistories.groupedCashHistories.map((dailyCashHistory) => ({
      ...dailyCashHistory,
      cashHistories: dailyCashHistory.cashHistories.filter(e => e.type === type)
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
    if (isIncomeChecked && isExpenditureChecked) {
      this.filteredCashHistoriesModel.cashHistories = this.cashHistoriesModel.cashHistories;
    } else if (isIncomeChecked) {
      // 수입
      this.filterData(0);
    } else if (isExpenditureChecked) {
      // 지출
      this.filterData(1);
    } else {
      this.filteredCashHistoriesModel.cashHistories = {
        message: '필터링 데이터입니다.',
        cashHistories: {
          totalIncome: 0,
          totalExpenditure: 0,
          groupedCashHistories: []
        }
      };
    }
  }

  onCashHistoryClick (e:Event): void {
    const cashHistoryId = Number((e.target as HTMLElement).dataset.id);
    if (cashHistoryId !== undefined) {
      this.filteredCashHistoriesModel.cashHistories?.cashHistories.groupedCashHistories
        .forEach(groupedCashHistory => groupedCashHistory.cashHistories
          .forEach(cashHistory => {
            if (cashHistory.id === cashHistoryId) {
              this.cashHistoryModel.cashHistory = cashHistory;
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
