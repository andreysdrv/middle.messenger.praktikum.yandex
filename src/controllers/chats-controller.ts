import { ChatsApi } from '../api/chats-api';
import store from '../utils/store';

class ChatsController {
  private api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();
      store.set('chats.data', chats);
    } catch (e) {
      console.error(e);
    }
  }

  async create(data: { title: string }) {
    try {
      await this.api.create(data);
      await this.fetchChats();
      store.set('modals.createChat.isOpen', false);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);
      await this.fetchChats();
    } catch (e) {
      console.error(e);
    }
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }

  openCreateChatModal() {
    store.set('modals.createChat.isOpen', true);
  }

  closeCreateChatModal() {
    store.set('modals.createChat.isOpen', false);
  }
}

export default new ChatsController();
