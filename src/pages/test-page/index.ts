import Block from '../../utils/block';
import template from './test-page.hbs';
import { ChatMessage } from '../../components/chat-message';

export class TestPage extends Block {
  constructor() {
    super('div');
  }

  init() {
    this.children.chatMessage = new ChatMessage({
      message: 'Привет!!!!!',
      isOutgoing: true,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
