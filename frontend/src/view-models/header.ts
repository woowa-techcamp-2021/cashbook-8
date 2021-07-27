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

  protected subscribe () {
    pubsub.subscribe(actions.ON_FOCUS_DATE_CHANGE, () => {
      this.view.build();
    });
  }

  get formatTime () {
    const time = this.focusDateModel.focusDate;

    return time.toString();
  }

  onNextMonthClicked () {
    console.log(this);
    this.focusDateModel.focusDate = new Date(2021, 9, 27);
  }

  onPreviousMonthClicked () {
    this.focusDateModel.focusDate = new Date(2021, 7, 27);
  }
}

export default HeaderViewModel;
