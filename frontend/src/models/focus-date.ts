import Model, { ProxyModelDataForm } from '../core/proxy-model';

export type FocusDateData = {
  focusDate: Date;
}

type InitialData = {
  focusDate: ProxyModelDataForm<Date>;
}

class FocusDateModel extends Model<InitialData> { }

export default FocusDateModel;
