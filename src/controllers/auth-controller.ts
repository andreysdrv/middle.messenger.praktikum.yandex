import { AuthApi, SignInData, SignUpData } from '../api/auth-api';
import store from '../utils/store';
import router from '../utils/router';
import MessagesController from './messages-controller';

class AuthController {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signup(data: SignUpData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go('/profile');
    } catch (e) {
      console.error(e);
    }
  }

  async signin(data: SignInData) {
    try {
      await this.api.signin(data);
      router.go('/profile');
      this.fetchUser();
    } catch (e: any) {
      console.error(e);
    }
  }

  async logout() {
    try {
      MessagesController.closeAll();
      await this.api.logout();
      router.go('/');
      store.set('user.data', undefined);
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchUser() {
    try {
      store.set('user.isLoading', true);
      const user = await this.api.getUser();
      store.set('user.data', user);
      store.set('user.isLoading', false);
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
}

export default new AuthController();
