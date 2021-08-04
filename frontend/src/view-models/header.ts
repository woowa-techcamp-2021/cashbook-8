import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { FocusDateData } from '../models/focus-date';

class HeaderViewModel extends ViewModel {
  private focusDateModel: FocusDateData;

  constructor (view: View) {
    super(view);
    this.focusDateModel = models.focusDate;
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_FOCUS_DATE_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_CASH_HISTORIES_CHANGE, () => {
      this.view.build();
    });
  }

  get focusedMonth (): number {
    return this.focusDateModel.focusDate.getMonth() + 1;
  }

  get focusedYear (): number {
    return this.focusDateModel.focusDate.getFullYear();
  }

  onNextMonthClicked (): void {
    const { focusDate } = this.focusDateModel;
    this.focusDateModel.focusDate = new Date(focusDate.setMonth(focusDate.getMonth() + 1));
  }

  onPreviousMonthClicked (): void {
    const { focusDate } = this.focusDateModel;
    this.focusDateModel.focusDate = new Date(focusDate.setMonth(focusDate.getMonth() - 1));
  }
}

export default HeaderViewModel;
