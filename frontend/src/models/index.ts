import actions from '../constant/actions';
import FocusDateModel from './focus-date';

const models = {
  focusDate: new FocusDateModel({
    focusDate: {
      action: actions.ON_FOCUS_DATE_CHANGE,
      data: new Date()
    }
  }).getProxy()
};

export default models;
