import Model, { ProxyModelDataForm } from '../core/proxy-model';
import { UserResponse } from '../types/user';

export type UserData = {
  user: UserResponse | null;
}

type InitialData = {
  user: ProxyModelDataForm<UserResponse | null>;
}

class UserModel extends Model<InitialData> { }

export default UserModel;
