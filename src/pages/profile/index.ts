import Block from '../../utils/block';
import template from './profile.hbs';
import { FormInput } from '../../components/form-input';
import { Form } from '../../components/form';

interface ProfilePageProps {
  avatar: string
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super('main', { ...props, avatar: props.avatar });
  }

  protected init() {
    this.children.form = new Form({
      name: 'settings-disabled',
      title: 'Андрей',
      fields: [
        new FormInput({
          type: 'email',
          id: 'email',
          name: 'email',
          placeholder: 'Почта',
          disabled: true,
          value: 'andrey@yandex.ru',
        }),
        new FormInput({
          type: 'text',
          id: 'login',
          name: 'login',
          placeholder: 'Логин',
          disabled: true,
          value: 'mrRobot',
        }),
        new FormInput({
          type: 'text',
          id: 'first_name',
          name: 'first_name',
          placeholder: 'Имя',
          disabled: true,
          value: 'Андрей',
        }),
        new FormInput({
          type: 'text',
          id: 'second_name',
          name: 'second_name',
          placeholder: 'Фамилия',
          disabled: true,
          value: 'Сидоров',
        }),
        new FormInput({
          type: 'text',
          id: 'second_name',
          name: 'second_name',
          placeholder: 'Имя в чате',
          disabled: true,
          value: 'Смешное_имя',
        }),
        new FormInput({
          type: 'tel',
          id: 'phone',
          name: 'phone',
          placeholder: 'Телефон',
          disabled: true,
          value: '+79123456789',
        }),
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
