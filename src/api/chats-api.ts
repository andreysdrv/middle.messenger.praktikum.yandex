import BaseAPI from './base-api';

export interface ChatData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: Date;
    content: string;
  };
}

export type ChatsData = ChatData[]

export class ChatsApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

  read() {
    return this.http.get<ChatsData>('?limit=50');
  }

  create(data: {title: string}) {
    return this.http.post('', data);
  }

  delete(id: number) {
    return this.http.delete('/', { chatId: id });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  getUsers(id: number) {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]) {
    return this.http.put('/users', { users, chatId: id });
  }

  removeUsers(id: number, users: number[]) {
    return this.http.delete('/users', { users, chatId: id });
  }

  update = undefined;
}
