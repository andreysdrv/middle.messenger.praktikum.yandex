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
    super({ ...props, avatar: props.avatar });
  }

  render() {
    return this.compile(template, this.props);
  }
}
