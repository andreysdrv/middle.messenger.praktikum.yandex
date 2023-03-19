import BaseAPI from './base-api';
import { UserData } from './auth-api';

export type UserProfileData = Omit<UserData, 'id' | 'avatar' | '' >

export type UserProfileAvatarData = FormData

export interface UserPasswordData {
  oldPassword: string,
  newPassword: string
}

export class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  editProfile(data: UserProfileData) {
    return this.http.put('/profile', data);
  }

  editProfileAvatar(data: UserProfileAvatarData) {
    return this.http.put('/profile/avatar', data);
  }

  editPassword(data:UserPasswordData) {
    return this.http.put('/password', data);
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}
