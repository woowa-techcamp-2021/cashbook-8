import actions from '../constant/actions';
import pubsub from '../core/pubsub';
import Router from '../core/router';
import View from '../core/view';
import ViewModel from '../core/view-model';
import models from '../models';
import { FocusDateData } from '../models/focus-date';
import userAPI from '../api/user';
import { UserData } from '../models/user';
import { User } from '../types/user';

class HeaderViewModel extends ViewModel {
  private focusDateModel: FocusDateData;
  private userModel: UserData;

  constructor (view: View) {
    super(view);
    this.focusDateModel = models.focusDate;
    this.userModel = models.user;
    this.fetchUser();
  }

  protected subscribe (): void {
    pubsub.subscribe(actions.ON_FOCUS_DATE_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_CASH_HISTORIES_CHANGE, () => {
      this.view.build();
    });

    pubsub.subscribe(actions.ON_USER_CHANGE, () => {
      this.view.build();
    });
  }

  private async fetchUser () {
    const user = await userAPI.fetchMyProfile();
    this.userModel.user = user;
  }

  get user (): User | undefined {
    return this.userModel.user?.user;
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

  navigate (route: string): void {
    Router.instance.push(route);
  }
}

export default HeaderViewModel;
