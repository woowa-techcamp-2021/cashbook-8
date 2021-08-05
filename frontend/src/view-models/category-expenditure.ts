import cashHistoryAPI from '../api/cash-history';
import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { CategoryExpenditureData } from '../models/category-expenditure';
import { FocusDateData } from '../models/focus-date';
import { totalCash } from '../types/cash-history';

class CategoryExpenditureViewModel extends ViewModel {
  private focusDateModel: FocusDateData;
  private categoryExpendituresModel: CategoryExpenditureData;

  constructor (view: View) {
    super(view);
    this.focusDateModel = models.focusDate;
    this.categoryExpendituresModel = models.categoryExpenditures;
    this.fetchCategoryExpenditures();
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_CATEGORY_EXPENDITURE_CHANGE, () => {
      this.view.build();
    });
  }

  private async fetchCategoryExpenditures () {
    const { focusDate } = this.focusDateModel;
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth() + 1;

    const totalCashes = await cashHistoryAPI.getTotalCashes(year, month, 6);
    this.categoryExpendituresModel.categoryExpenditures = totalCashes;
  }

  get totalCashes (): totalCash[] | undefined {
    return this.categoryExpendituresModel.categoryExpenditures?.totalCashes;
  }
}

export default CategoryExpenditureViewModel;
