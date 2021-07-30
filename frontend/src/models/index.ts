import actions from '../constant/actions';
import CashHistoriesModel from './cash-histories';
import FocusDateModel from './focus-date';

const models = {
  focusDate: new FocusDateModel({
    focusDate: {
      action: actions.ON_FOCUS_DATE_CHANGE,
      data: new Date()
    }
  }).getProxy(),
  cashHistories: new CashHistoriesModel({
    cashHistories: {
      action: actions.ON_CASH_HISTORY_CHANGE,
      data: null
    }
  }).getProxy()
};

export default models;
