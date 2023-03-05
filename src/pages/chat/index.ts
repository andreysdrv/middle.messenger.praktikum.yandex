import Block from '../../utils/block';
import template from './chat.hbs';
import { ChatMessage } from '../../components/chat-message';
import { ChatItem } from '../../components/chat-item/intex';
import avatar from '../../assets/user.png';

interface ChatPageProps {
  avatar: string
  events: Record<string, (e: Event) => void>
}

export class ChatPage extends Block {
  constructor(props: ChatPageProps) {
    super('main', { ...props, avatar: props.avatar });
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
  }

  render() {
    return this.compile(template, this.props);
  }
}
