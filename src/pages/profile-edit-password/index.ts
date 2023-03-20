import Block from '../../utils/block';
import template from './profile-edit-password.hbs';
import { FormInput } from '../../components/form-input';
import { Form } from '../../components/form';
import { UserPasswordData } from '../../api/user-api';
import { validator } from '../../utils/helpers';
import { InputError } from '../../components/input-error';
import UserController from '../../controllers/user-controller';
import { ProfileBackButton } from '../../components/profile-back-button';
import router from '../../utils/router';

interface ProfilePasswordProps extends UserPasswordData {}

const passwordFields = [
  'newPassword',
  'oldPassword',
] as Array<keyof ProfilePasswordProps>;

export class ProfileEditPasswordPage extends Block {
  protected init() {
    this.children.back = new ProfileBackButton({
      events: {
        click: () => router.go('/profile'),
      },
    });
    this.children.form = this.createForm();
  }

  handleSubmit() {
    const values: Record<string, string> = {};

    (this.children.form.children.fields as FormInput[]).forEach((field) => {
      const input = field.element!.querySelector('input') as HTMLInputElement;

      if (validator(input).isValid) {
        (field.children.error as InputError).setProps({ errorText: '' });
      } else {
        (field.children.error as InputError).setProps({ errorText: validator(input).error });
      }

      values[input.name] = input!.value;
    });

    UserController.editUserPassword(values);
  }

  createForm() {
    return new Form({
      name: 'password',
      submitText: 'Сохранить',
      fields: passwordFields.map((name) => new FormInput({
        value: this.props[name],
        name,
        id: name,
        placeholder:
            name === 'newPassword'
              ? 'Новый пароль' : 'Старый пароль',
        type: 'password',
      })),
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          this.handleSubmit();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
