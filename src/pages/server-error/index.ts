import Block from '../../utils/block';
import template from './server-error.hbs';
import { Error } from '../../components/error';

export class ServerErrorPage extends Block {
  constructor() {
    super({});
  }

  protected init() {
    this.children.error = new Error({
      code: 500,
      redirectPath: 'CHAT',
      title: 'Мы уже фиксим',
      redirectText: 'Назад к чатам',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
