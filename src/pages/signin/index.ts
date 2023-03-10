import Block from '../../utils/block';
import template from './signin.hbs';
import { FormInput } from '../../components/form-input';
import { Form } from '../../components/form';

export class SigninPage extends Block {
  constructor() {
    super('main');
  }

  protected init() {
    this.children.form = new Form({
      name: 'login',
      title: 'Вход',
      submitText: 'Войти',
      redirectText: 'Ещё не зарегистрированы?',
      fields: [
        new FormInput({
          type: 'text',
          id: 'login',
          name: 'login',
          placeholder: 'Логин',
        }),
        new FormInput({
          type: 'password',
          id: 'password',
          name: 'password',
          placeholder: 'Пароль',
        }),
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
