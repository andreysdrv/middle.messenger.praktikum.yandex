import BaseAPI from './base-api';

export interface SignUpData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}
export interface SignInData {
    login: string,
    password: string
}

export interface UserData {
    id: number,
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
    avatar: string
}

export class AuthApi extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: SignUpData) {
    return this.http.post<{id: number}>('/signup', data);
  }

  signin(data: SignInData) {
    return this.http.post('/signin', data);
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get<UserData>('/user');
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}
