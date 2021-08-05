import Model, { ProxyModelDataForm } from '../core/proxy-model';

export type UserData = {
  user: UserData | null;
}

type InitialData = {
  user: ProxyModelDataForm<UserData | null>;
}

class UserModel extends Model<InitialData> { }

export default UserModel;
