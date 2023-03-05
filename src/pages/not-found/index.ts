import Block from '../../utils/block';
import template from './not-found.hbs';
import { Error } from '../../components/error';

export class NotFoundPage extends Block {
  constructor() {
    super('main');
  }

  protected init() {
    this.children.error = new Error({
      code: 404,
      redirectPath: 'CHAT',
      title: 'Не туда попали',
      redirectText: 'Назад к чатам',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
