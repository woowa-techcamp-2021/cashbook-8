import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { CategoryExpenditureData } from '../models/category-expenditure';
import { totalCash } from '../types/cash-history';
import CategoryExpenditureView from '../views/category-expenditure';

class CategoryExpenditureViewModel extends ViewModel {
  private categoryExpendituresModel: CategoryExpenditureData;

  constructor (view: View) {
    super(view);
    this.categoryExpendituresModel = models.categoryExpenditures;
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

  get totalCashes (): totalCash[] | undefined {
    return this.categoryExpendituresModel.categoryExpenditures?.totalCashes;
  }
}

export default CategoryExpenditureViewModel;
