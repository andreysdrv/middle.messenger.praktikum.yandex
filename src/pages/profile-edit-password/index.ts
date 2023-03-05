import Block from '../../utils/block';
import template from './profile-edit-password.hbs';
import { FormInput } from '../../components/form-input';

interface ProfileEditPasswordPageProps {
  events: Record<string, (e: Event) => void>
}

export class ProfileEditPasswordPage extends Block {
  constructor(props: ProfileEditPasswordPageProps) {
    super('main', props);
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
