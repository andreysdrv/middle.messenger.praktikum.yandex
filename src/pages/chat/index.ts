import Block from '../../utils/block';
import template from './chat.hbs';
import { ChatMessage } from '../../components/chat-message';
import { ChatItem } from '../../components/chat-item/intex';
import avatar from '../../assets/user.png';
import { ProfileLink } from '../../components/profile-link';
import ChatsController from '../../controllers/chats-controller';
import store, { withStore } from '../../utils/store';
import { ChatData } from '../../api/chats-api';
import { ChatAddButton } from '../../components/chat-add-button';
import { ModalWithForm } from '../../components/modal-with-form';

export class ChatPageBase extends Block {
  constructor() {
    super({
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const values = {};
          form.querySelectorAll('input')
            .forEach((field) => {
              // @ts-ignore
              values[field.name] = field.value;
            });

          console.log(values);
        },
      },
    });

    ChatsController.fetchChats();
  }

  init() {
    this.children.link = new ProfileLink({
      label: 'Профиль',
      to: '/profile',
    });

    this.children.button = new ChatAddButton({
      events: {
        click: () => {
          ChatsController.openCreateChatModal();
        },
      },
    });

    this.children.modal = new ModalWithForm({});
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.chatItems = newProps.chats.data.map((chat: ChatData) => new ChatItem({
      ...chat,
      events: {
        click: () => {
          ChatsController.selectChat(chat.id);
        },
      },
    }));

    this.children.chatMessages = [
      new ChatMessage({
        message: this.props.selectedChat
          ? this.props.selectedChat
          : 'Выберите чат из списка или создайте новый',
        isOutgoing: true,
      }),
    ];

    return true;
  }

  render() {
    return this.compile(template, { ...this.props, avatar });
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
}));

export const ChatPage = withChats(ChatPageBase);
