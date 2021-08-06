import Model, { ProxyModelDataForm } from '../core/proxy-model';
import { CashHistoriesResponse, CategoryExpenditureResponse } from '../types/cash-history';

export type CategoryExpenditureData = {
  categoryExpenditures: CategoryExpenditureResponse | null;
  categoryId: number | null;
}

type InitialData = {
  categoryExpenditures: ProxyModelDataForm<CashHistoriesResponse | null>;
  categoryId: ProxyModelDataForm<number | null>;
}

class CategoryExpenditureModel extends Model<InitialData> { }

export default CategoryExpenditureModel;
