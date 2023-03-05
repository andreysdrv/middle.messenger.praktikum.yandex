import Block from '../../utils/block';
import template from './chat-item.hbs';

interface ChatItemProps {
  avatar: string
  from: string
  message: string
  timestamp: string
  count: string
  isIncoming: boolean
}

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super('li', { ...props, avatar: props.avatar });
  }

  init() {
    this.element!.classList.add('chat__list-item-wrapper');
  }

  render() {
    return this.compile(template, this.props);
  }
}
