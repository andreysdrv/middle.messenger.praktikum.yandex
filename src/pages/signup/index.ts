import Block from '../../utils/block';
import template from './signup.hbs';
import { Form } from '../../components/form';
import { FormInput } from '../../components/form-input';
import { submit } from '../../utils/helpers';

export class SignupPage extends Block {
  constructor() {
    super('main');
  }

  protected init() {
    this.children.form = new Form({
      name: 'signin',
      title: 'Регистрация',
      submitText: 'Создать аккаунт',
      redirectText: 'Войти',
      fields: [
        new FormInput({
          type: 'email',
          id: 'email',
          name: 'email',
          placeholder: 'Почта',
        }),
        new FormInput({
          type: 'text',
          id: 'login',
          name: 'login',
          placeholder: 'Логин',
        }),
        new FormInput({
          type: 'text',
          id: 'first_name',
          name: 'first_name',
          placeholder: 'Имя',
        }),
        new FormInput({
          type: 'text',
          id: 'second_name',
          name: 'second_name',
          placeholder: 'Фамилия',
        }),
        new FormInput({
          type: 'tel',
          id: 'phone',
          name: 'phone',
          placeholder: 'Телефон',
        }),
        new FormInput({
          type: 'password',
          id: 'password',
          name: 'password',
          placeholder: 'Пароль',
        }),
        new FormInput({
          type: 'password',
          id: 'password_repeat',
          name: 'password',
          placeholder: 'Повторите пароль',
          errorText: 'Пароли не совпадают',
        }),
      ],
      events: {
        submit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
