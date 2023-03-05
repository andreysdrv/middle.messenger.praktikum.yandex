import Block from '../../utils/block';
import template from './chat-message.hbs';

interface ChatMessageProps {
    isOutgoing: boolean
    message: string
}

export class ChatMessage extends Block {
  constructor(props: ChatMessageProps) {
    super('li', props);
  }

  init() {
    this.element!.classList.add('chat__feed-message');

    if (this.props.isOutgoing) {
     this.element!.classList.add('chat__feed-message_outgoing');
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
