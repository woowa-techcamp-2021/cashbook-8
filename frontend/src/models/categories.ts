import Model, { ProxyModelDataForm } from '../core/proxy-model';
import { CategoriesResponse } from '../types/category';

export type CategoriesData = {
  categories: CategoriesResponse | null;
}

type InitialData = {
  categories: ProxyModelDataForm<CategoriesResponse | null>;
}

class CategoriesModel extends Model<InitialData> { }

export default CategoriesModel;
