import Model, { ProxyModelDataForm } from '../core/proxy-model';
import { CategoriesResponse } from '../types/category';

export type CategoriesData = {
  cashHistories: CategoriesResponse | null;
}

type InitialData = {
  cashHistories: ProxyModelDataForm<CategoriesResponse | null>;
}

class CategoriesModel extends Model<InitialData> { }

export default CategoriesModel;
