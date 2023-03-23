import Block from '../../utils/block';
import template from './chat-message.hbs';
import { Message } from '../../controllers/messages-controller';

interface ChatMessageProps extends Message {
  isOutgoing: boolean
}

export class ChatMessage extends Block {
  constructor(props: ChatMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
