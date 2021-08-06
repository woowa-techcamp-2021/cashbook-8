import cashHistoryAPI from '../api/cash-history';
import categoryAPI from '../api/category';
import colors from '../assets/styles/colors';
import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import { CashHistories } from '../enums/cash-history.enum';
import models from '../models';
import { CashHistoriesData } from '../models/cash-histories';
import { CategoriesData } from '../models/categories';
import { CategoryExpenditureData } from '../models/category-expenditure';
import { FocusDateData } from '../models/focus-date';
import { CashHistory } from '../types/cash-history';
import { Category } from '../types/category';
import { PieChartInputData } from '../ui-elements/chart/pie-chart';
import { formatNumber } from '../utils/formatter';
import toast from '../utils/toast/toast';

export type ExpenditureGroupedByCategory = {
  index: number;
  expenditure: number;
  rate: number;
  category: Category | null;
}

class ExpenditureInMonthViewModel extends ViewModel {
  private cashHistoriesModel: CashHistoriesData;
  private focusDateModel: FocusDateData;
  private categoriesModel: CategoriesData;
  private categoryExpendituresModel: CategoryExpenditureData;

  constructor (view: View) {
    super(view);
    this.cashHistoriesModel = models.cashHistories;
    this.focusDateModel = models.focusDate;
    this.categoriesModel = models.categories;
    this.categoryExpendituresModel = models.categoryExpenditures;

    this.fetchCashHistories();
    this.fetchCategories();
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

  private async fetchCashHistories () {
    const { focusDate } = this.focusDateModel;
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth() + 1;

    try {
      const cashHistories = await cashHistoryAPI.fetchCashHistories(year, month);
      this.cashHistoriesModel.cashHistories = cashHistories;
    } catch (error) {
      const { status } = error;

      if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  async fetchCategoryExpenditures (categoryId: number): Promise<void> {
    const { focusDate } = this.focusDateModel;
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth() + 1;

    try {
      const totalCashes = await cashHistoryAPI.getTotalCashes(year, month, categoryId);
      this.categoryExpendituresModel.categoryExpenditures = totalCashes;
      this.categoryExpendituresModel.categoryId = categoryId;
    } catch (error) {
      const { status } = error;

      if (status === 500) {
        toast.error('다시 시도해주세요');
      }
    }
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_FOCUS_DATE_CHANGE, () => {
      this.fetchCashHistories();
    });

    pubsub.subscribe(actions.ON_CASH_HISTORIES_CHANGE, () => {
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
      const { index, category, expenditure } = categoryExpenditure;

      return {
        kye: index,
        name: category?.name ?? '미분류',
        color: category?.color ?? colors.primary,
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
    const totalCashHistories = groupedCashHistories.reduce((totalCashHistories, monthlyCashHistory) => {
      return [
        ...totalCashHistories,
        ...monthlyCashHistory.cashHistories
      ];
    }, [] as CashHistory[]);

    const cashHistoriesGroupedByCategory: ExpenditureGroupedByCategory[] = categories.map((category, index) => {
      const expenditure = totalCashHistories
        .filter((cashHistory) => cashHistory.categoryId === category.id)
        .reduce((sum, cashHistory) => sum + cashHistory.price, 0);

      return {
        index,
        category,
        expenditure,
        rate: expenditure / totalExpenditure * 100
      };
    });

    // 미분류 처리
    const etcExpenditure = totalCashHistories
      .filter((cashHistory) => cashHistory.category === null && cashHistory.type === CashHistories.Expenditure)
      .reduce((sum, cashHistory) => sum + cashHistory.price, 0);

    cashHistoriesGroupedByCategory.push({
      index: 0,
      category: null,
      expenditure: etcExpenditure,
      rate: etcExpenditure / totalExpenditure * 100
    });

    cashHistoriesGroupedByCategory.sort((a, b) => b.expenditure - a.expenditure);
    cashHistoriesGroupedByCategory.forEach((cashHistory, index) => {
      cashHistory.index = index;
    });

    return cashHistoriesGroupedByCategory;
  }
}

export default ExpenditureInMonthViewModel;
