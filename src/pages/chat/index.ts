import Block from '../../utils/block';
import template from './chat.hbs';
import { ChatMessage } from '../../components/chat-message';
import { ChatItem } from '../../components/chat-item/intex';
import avatar from '../../assets/user.png';
import { Link } from '../../components/link';
import { ProfileLink } from '../../components/profile-link';

export class ChatPage extends Block {
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
  }

  init() {
    this.children.chatMessages = [
      new ChatMessage({
        message: 'Привет, Андрей!1',
        isOutgoing: true,
      }),
      new ChatMessage({
        message: 'Привет, Андрей!2',
        isOutgoing: false,
      }),
    ];

    this.children.chatItems = [
      new ChatItem({
        avatar,
        isIncoming: true,
        message: 'Привет!1',
        timestamp: '10:02',
        from: 'Андрей',
        count: '1',
      }),
      new ChatItem({
        avatar,
        isIncoming: false,
        message: 'Привет!2',
        timestamp: '10:02',
        from: 'Андрей',
        count: '1',
      }),
    ];

    this.children.link = new ProfileLink({
      label: 'Профиль',
      to: '/profile',
    });
  }

  render() {
    return this.compile(template, { ...this.props, avatar });
  }
}
