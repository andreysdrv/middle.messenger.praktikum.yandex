import Block from '../../utils/block';
import template from './chat-message.hbs';

interface ChatMessageProps {
    isOutgoing: boolean
    message: string
}

export class ChatMessage extends Block {
  constructor(props: ChatMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
