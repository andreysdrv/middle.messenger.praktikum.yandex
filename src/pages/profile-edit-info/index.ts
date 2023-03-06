import Block from '../../utils/block';
import template from './profile-edit-info.hbs';
import { FormInput } from '../../components/form-input';
import { Form } from '../../components/form';

export class ProfileEditInfoPage extends Block {
  constructor() {
    super('main');
  }

  protected init() {
    this.children.form = new Form({
      name: 'settings',
      submitText: 'Сохранить',
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
          type: 'text',
          id: 'display_name',
          name: 'display_name',
          placeholder: 'Имя в чате',
        }),
        new FormInput({
          type: 'tel',
          id: 'phone',
          name: 'phone',
          placeholder: 'Телефон',
        }),
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
