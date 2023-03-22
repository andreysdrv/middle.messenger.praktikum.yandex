import Block from '../../utils/block';
import template from './messenger.hbs';
import styles from './styles.module.pcss';
import { ChatMessage } from '../../components/chat-message';
import { ChatItem } from '../../components/chat-item/intex';
import { ProfileLink } from '../../components/profile-link';
import ChatsController from '../../controllers/chats-controller';
import { withStore } from '../../utils/store';
import { ChatData } from '../../api/chats-api';
import { ChatAddButton } from '../../components/chat-add-button';
import { ModalWithForm } from '../../components/modal-with-form';
import MessagesController, { Message } from '../../controllers/messages-controller';
import { Form } from '../../components/form';
import { FormInput } from '../../components/form-input';
import { ChatActionButton } from '../../components/chat-action-button';
import UserController from '../../controllers/user-controller';

export class MessengerPageBase extends Block {
  constructor() {
    super({
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const message = form.querySelector('input')!.value;

          MessagesController.sendMessage(this.props.selectedChatId, message);
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
        click: () => ChatsController.openCreateChatModal(),
      },
    });

    this.children.modal = new ModalWithForm({
      form: new Form({
        name: 'createChat',
        fields: [
          new FormInput({
            type: 'text',
            name: 'create_chat',
            placeholder: 'Введите название чата',
            id: 'create_chat',
          }),
        ],
        title: 'Создать новый чат',
        submitText: 'Создать',
        events: {
          submit: (e) => {
            const target = e.target as HTMLInputElement;
            const title = target.querySelector('input')!.value;

            ChatsController.create({ title });
          },
        },
      }),
      onCloseClick: ChatsController.closeCreateChatModal,
    });
  }

  protected componentDidUpdate(_: any, newProps: any): boolean {
    this.children.chatItems = newProps.chats.data.map((chat: ChatData) => new ChatItem({
      ...chat,
      last_message: chat.last_message !== null ? {
        ...chat.last_message,
        time: new Date(chat.last_message?.time).toLocaleString(),
      } : null,
      events: {
        click: async () => {
          ChatsController.selectChat(chat.id);
        },
      },
    }));

    if (this.props.messages?.[`${this.props.selectedChatId}`]?.length > 0) {
      this.children.chatMessages = this.props.messages?.[`${this.props.selectedChatId}`]
        .map((message: Message) => new ChatMessage({
          ...message,
          isOutgoing: message.user_id === this.props.user,
        }));
    }

    this.children.actions = [
      new ChatActionButton({
        label: 'Добавить пользователя',
        events: {
          click: async () => {
            const login = prompt('Введите имя пользователя, которого хотите добавить в чат') || '';
            const [user] = await UserController.getUserByLogin(login);
            await ChatsController.addUserToChat(this.props.selectedChatId, user.id);
            ChatsController.getChatUsers(this.props.selectedChatId);
          },
        },
      }),
      new ChatActionButton({
        label: 'Удалить пользователя',
        events: {
          click: async () => {
            const login = prompt('Введите имя пользователя, которого хотите удалить из чата') || '';
            const [user] = await UserController.getUserByLogin(login);
            await ChatsController.removeUsersFromChat(this.props.selectedChatId, user.id);
            ChatsController.getChatUsers(this.props.selectedChatId);
          },
        },
      }),
      new ChatActionButton({
        label: 'Удалить чат',
        events: {
          click: () => {
            ChatsController.delete(this.props.selectedChatId);
          },
        },
      }),
    ];

    return true;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
  selectedChatId: state.selectedChatId,
  selectedChatState: state.chats.data?.find((chat) => chat.id === state.selectedChatId),
  messages: state.messages,
  user: state.user.data?.id,
}));

export const MessengerPage = withChats(MessengerPageBase);
