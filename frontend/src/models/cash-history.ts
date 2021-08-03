import Model, { ProxyModelDataForm } from '../core/proxy-model';
import { CashHistory } from '../types/cash-history';

export type CashHistoryData = {
  cashHistory: CashHistory | null;
}

type InitialData = {
  cashHistory: ProxyModelDataForm<CashHistory | null>;
}

class CashHistoryModel extends Model<InitialData> { }

export default CashHistoryModel;
