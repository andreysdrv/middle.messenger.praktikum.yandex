import Block from '../../utils/block';
import template from './profile-edit-password.hbs';
import { FormInput } from '../../components/form-input';

export class ProfileEditPasswordPage extends Block {
  constructor() {
    super('main');
  }

  protected init() {
    this.children.fields = [
      new FormInput({
        type: 'password',
        id: 'oldPassword',
        name: 'oldPassword',
        placeholder: 'Старый пароль',
      }),
      new FormInput({
        type: 'password',
        id: 'newPassword',
        name: 'newPassword',
        placeholder: 'Новый пароль',
      }),
      new FormInput({
        type: 'password',
        id: 'newPassword',
        name: 'newPassword',
        placeholder: 'Повторите новый пароль',
      }),
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}
