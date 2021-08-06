import Model, { ProxyModelDataForm } from '../core/proxy-model';
import { CashHistoriesResponse } from '../types/cash-history';

export type CashHistoriesData = {
  cashHistories: CashHistoriesResponse | null;
}

type InitialData = {
  cashHistories: ProxyModelDataForm<CashHistoriesResponse | null>;
}

class CashHistoriesModel extends Model<InitialData> { }

export default CashHistoriesModel;
