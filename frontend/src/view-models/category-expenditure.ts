import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { CashHistoriesData } from '../models/cash-histories';
import { CategoryExpenditureData } from '../models/category-expenditure';
import { CashHistoriesInDay, TotalCash } from '../types/cash-history';
import CategoryExpenditureView from '../views/category-expenditure';

class CategoryExpenditureViewModel extends ViewModel {
  private categoryExpendituresModel: CategoryExpenditureData;
  private cashHistoriesModel: CashHistoriesData;

  constructor (view: View) {
    super(view);
    this.categoryExpendituresModel = models.categoryExpenditures;
    this.cashHistoriesModel = models.cashHistories;
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_CATEGORY_EXPENDITURE_CHANGE, () => {
      this.view.build();
      (this.view as CategoryExpenditureView).show();
    });

    pubsub.subscribe(actions.ON_FOCUS_DATE_CHANGE, () => {
      this.view.build();
    });
  }

  get cashHistories (): CashHistoriesInDay[] {
    if (this.cashHistoriesModel.cashHistories === null) {
      return [];
    }

    const { groupedCashHistories } = this.cashHistoriesModel.cashHistories.cashHistories;
    return groupedCashHistories.map((dailyCashHistory) => {
      const cashHistories = dailyCashHistory.cashHistories.filter((cashHistory) => {
        return cashHistory.category?.id === this.categoryExpendituresModel.categoryId;
      });

      return {
        ...dailyCashHistory,
        cashHistories
      };
    });
  }

  get totalCashes (): TotalCash[] | undefined {
    return this.categoryExpendituresModel.categoryExpenditures?.totalCashes;
  }
}

export default CategoryExpenditureViewModel;
