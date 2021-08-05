import { BaseResponse } from './base-response';

export type User = {
  id: number;
  name: string;
  avatarURL: string;
}

export type UserResponse = {
  user: User;
} & BaseResponse;

export type GuestLoginResponse = {
  accessToken: string;
} & BaseResponse;
