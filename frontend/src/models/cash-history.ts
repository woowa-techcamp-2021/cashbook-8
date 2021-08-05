import Model, { ProxyModelDataForm } from '../core/proxy-model';

export type CashHistoryData = {
  id: number | null;
  price: number | null;
  content: string | null;
  createdAt: Date;
  categoryId: number | null;
  paymentId: number | null;
}

type InitialData = {
  id: ProxyModelDataForm<number | null>;
  price: ProxyModelDataForm<number | null>;
  content: ProxyModelDataForm<string | null>;
  createdAt: ProxyModelDataForm<Date>;
  categoryId: ProxyModelDataForm<number | null>;
  paymentId: ProxyModelDataForm<number | null>;
}

class CashHistoryModel extends Model<InitialData> { }

export default CashHistoryModel;
