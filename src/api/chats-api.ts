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
    return this.http.get<ChatsData>('');
  }

  create(data: {title: string}) {
    return this.http.post('', data);
  }

  delete(id: number) {
    return this.http.delete('/', { chatId: id });
  }

  update = undefined;
}
