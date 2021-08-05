import actions from '../constant/actions';
import CashHistoriesModel from './cash-histories';
import CashHistoryModel from './cash-history';
import CategoriesModel from './categories';
import CategoryExpenditureModel from './category-expenditure';
import FocusDateModel from './focus-date';
import PaymentsModel from './payments';
import UserModel from './user';

const models = {
  focusDate: new FocusDateModel({
    focusDate: {
      action: actions.ON_FOCUS_DATE_CHANGE,
      data: new Date()
    }
  }).getProxy(),
  cashHistories: new CashHistoriesModel({
    cashHistories: {
      action: actions.ON_CASH_HISTORIES_CHANGE,
      data: null
    }
  }).getProxy(),
  filteredCashHistories: new CashHistoriesModel({
    cashHistories: {
      action: actions.ON_FILTERED_CASH_HISTORIES_CHANGE,
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
  }).getProxy(),
  cashHistory: new CashHistoryModel({
    id: {
      action: actions.ON_CASH_HISTORY_CHANGE,
      data: null
    },
    price: {
      action: actions.ON_CASH_HISTORY_CHANGE,
      data: null
    },
    content: {
      action: actions.ON_CASH_HISTORY_CHANGE,
      data: null
    },
    createdAt: {
      action: actions.ON_CASH_HISTORY_CHANGE,
      data: new Date()
    },
    categoryId: {
      action: actions.ON_CASH_HISTORY_CHANGE,
      data: null
    },
    paymentId: {
      action: actions.ON_CASH_HISTORY_CHANGE,
      data: null
    }
  }).getProxy(),
  categoryExpenditures: new CategoryExpenditureModel({
    categoryExpenditures: {
      action: actions.ON_CATEGORY_EXPENDITURE_CHANGE,
      data: null
    }
  }).getProxy(),
  user: new UserModel({
    user: {
      action: actions.ON_USER_CHANGE,
      data: null
    }
  }).getProxy()
};

export default models;
