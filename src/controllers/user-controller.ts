import {
  UserApi, UserPasswordData, UserProfileAvatarData, UserProfileData,
} from '../api/user-api';
import router from '../utils/router';
import store from '../utils/store';

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async editUserInfo(data: UserProfileData) {
    try {
      store.set('user.isLoading', true);
      const user = await this.api.editProfile(data);
      store.set('user.data', user);

      router.go('/profile');
    } catch (e) {
      console.error(e);
    } finally {
      store.set('user.isLoading', false);
    }
  }

  async editUserAvatar(data: UserProfileAvatarData) {
    try {
      store.set('user.isLoading', true);
      const user = await this.api.editProfileAvatar(data);
      store.set('user.data', user);
    } catch (e) {
      console.error(e);
    } finally {
      store.set('user.isLoading', false);
    }
  }

  async editUserPassword(data: UserPasswordData) {
    try {
      await this.api.editPassword(data);
      router.go('/profile');
    } catch (e) {
      console.error(e);
    }
  }

  async getUserByLogin(login: string) {
    if (!login) {
      throw new Error('Некорректрый ввод');
    }
    try {
      return await this.api.getUserByLogin(login);
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

export default new UserController();
