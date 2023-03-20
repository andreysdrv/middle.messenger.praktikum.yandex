import { ChatsApi } from '../api/chats-api';
import store from '../utils/store';
import MessagesController from './messages-controller';

class ChatsController {
  private api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();
      store.set('chats.data', chats);

      chats.forEach(async (chat) => {
        await MessagesController.connect(chat.id, await this.getToken(chat.id));
      });
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
    store.set('selectedChatId', id);
  }

  openCreateChatModal() {
    store.set('modals.createChat.isOpen', true);
  }

  closeCreateChatModal() {
    store.set('modals.createChat.isOpen', false);
  }

  openChatActionsModal() {
    store.set('modals.chatActions.isOpen', true);
  }

  closeChatActionsModal() {
    store.set('modals.chatActions.isOpen', false);
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }
}

export default new ChatsController();
