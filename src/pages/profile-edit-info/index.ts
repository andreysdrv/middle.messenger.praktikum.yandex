import Block from '../../utils/block';
import template from './profile-edit-info.hbs';
import { FormInput } from '../../components/form-input';

interface ProfileEditInfoPageProps {
  events: Record<string, (e: Event) => void>
}

export class ProfileEditInfoPage extends Block {
  constructor(props: ProfileEditInfoPageProps) {
    super('main', props);
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
