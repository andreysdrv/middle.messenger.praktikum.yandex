import Block from '../../utils/block';
import template from './chat-item.hbs';
import styles from './chat-item.module.pcss';
import { ChatData } from '../../api/chats-api';

interface ChatItemProps extends ChatData {
  events: {
    click: (event: Event) => void
  }
}

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
