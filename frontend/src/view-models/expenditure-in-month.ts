import cashHistoryAPI from '../api/cash-history';
import categoryAPI from '../api/category';
import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import { CashHistories } from '../enums/cash-history.enum';
import models from '../models';
import { CashHistoriesData } from '../models/cash-histories';
import { CategoriesData } from '../models/categories';
import { FocusDateData } from '../models/focus-date';
import { CashHistory } from '../types/cash-history';
import { Category } from '../types/category';
import { PieChartInputData } from '../ui-elements/chart/pie-chart';
import { formatNumber } from '../utils/formatter';

export type ExpenditureGroupedByCategory = {
  expenditure: number;
  rate: number;
  category: Category;
}

class ExpenditureInMonthViewModel extends ViewModel {
  private cashHistoriesModel: CashHistoriesData;
  private focusDateModel: FocusDateData;
  private categoriesModel: CategoriesData;

  constructor (view: View) {
    super(view);
    this.cashHistoriesModel = models.cashHistories;
    this.focusDateModel = models.focusDate;
    this.categoriesModel = models.categories;

    this.fetchCashHistories();
    this.fetchCategories();
  }

  private async fetchCategories () {
    const categories = await categoryAPI.fetchCategories();
    this.categoriesModel.categories = categories;
  }

  private async fetchCashHistories () {
    const { focusDate } = this.focusDateModel;
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth() + 1;

    const cashHistories = await cashHistoryAPI.fetchCashHistories(year, month);
    this.cashHistoriesModel.cashHistories = cashHistories;
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_FOCUS_DATE_CHANGE, () => {
      this.fetchCashHistories();
    });

    pubsub.subscribe(actions.ON_CASH_HISTORY_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_CATEGORIES_CHANGE, () => {
      this.view.build();
    });
  }

  get focusedMonth (): number {
    return this.focusDateModel.focusDate.getMonth() + 1;
  }

  get focusedYear (): number {
    return this.focusDateModel.focusDate.getFullYear();
  }

  get totalExpenditure (): number {
    return this.cashHistoriesModel.cashHistories?.cashHistories.totalExpenditure ?? 0;
  }

  get expenditurePieChartInput (): PieChartInputData[] {
    const totalExpenditure = this.cashHistoriesModel.cashHistories?.cashHistories.totalExpenditure ?? 0;
    if (totalExpenditure <= 0) {
      return [];
    }

    return this.expenditureGroupedByCategory.map((categoryExpenditure) => {
      const { category, expenditure } = categoryExpenditure;

      return {
        name: category.name,
        color: category.color,
        value: expenditure,
        label: formatNumber(expenditure)
      };
    });
  }

  get expenditureGroupedByCategory (): ExpenditureGroupedByCategory[] {
    if (this.categoriesModel.categories === null ||
      this.cashHistoriesModel.cashHistories === null) {
      return [];
    }

    const { cashHistories } = this.cashHistoriesModel.cashHistories;
    const categories = this.categoriesModel.categories.categories.filter((category) => {
      return category.type === CashHistories.Expenditure;
    });

    const { totalExpenditure, groupedCashHistories } = cashHistories;
    const totalCashHistories = groupedCashHistories.reduce((totalCashHistories, dailyCashHistory) => {
      return [
        ...totalCashHistories,
        ...dailyCashHistory.cashHistories
      ];
    }, [] as CashHistory[]);

    const cashHistoriesGroupedByCategory = categories.map((category) => {
      const expenditure = totalCashHistories
        .filter((cashHistory) => cashHistory.categoryId === category.id)
        .reduce((sum, cashHistory) => sum + cashHistory.price, 0);

      return {
        category,
        expenditure,
        rate: expenditure / totalExpenditure * 100
      };
    });

    cashHistoriesGroupedByCategory.sort((a, b) => b.expenditure - a.expenditure);

    return cashHistoriesGroupedByCategory;
  }
}

export default ExpenditureInMonthViewModel;
