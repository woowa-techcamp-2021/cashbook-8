import Model, { ProxyModelDataForm } from '../core/proxy-model';
import { PaymentsResponse } from '../types/payment';

export type PaymentsData = {
  payments: PaymentsResponse | null;
}

type InitialData = {
  payments: ProxyModelDataForm<PaymentsResponse | null>;
}

class PaymentsModel extends Model<InitialData> { }

export default PaymentsModel;
