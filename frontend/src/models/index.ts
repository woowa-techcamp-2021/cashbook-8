import actions from '../constant/actions';
import CashHistoriesModel from './cash-histories';
import CategoriesModel from './categories';
import FocusDateModel from './focus-date';
import PaymentsModel from './payments';

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
  }).getProxy(),
  filteredCashHistories: new CashHistoriesModel({
    cashHistories: {
      action: actions.ON_FILTERED_CASH_HISTORY_CHANGE,
      data: null
    }
  }).getProxy(),
  payments: new PaymentsModel({
    payments: {
      action: actions.ON_PAYMENTS_CHANGE,
      data: null
    }
  }).getProxy(),
  categories: new CategoriesModel({
    categories: {
      action: actions.ON_CATEGORIES_CHANGE,
      data: null
    }
  }).getProxy()
};

export default models;
