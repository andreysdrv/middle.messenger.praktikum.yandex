import Block from '../../utils/block';
import template from './profile.hbs';
import { FormInput } from '../../components/form-input';

interface ProfilePageProps {
  avatar: string
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super('main', { ...props, avatar: props.avatar });
  }

  protected init() {
    this.children.fields = [
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
        id: 'second_name',
        name: 'second_name',
        placeholder: 'Имя в чате',
      }),
      new FormInput({
        type: 'tel',
        id: 'phone',
        name: 'phone',
        placeholder: 'Телефон',
      }),
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}
