import Block from '../../utils/block';
import template from './profile-edit-info.hbs';
import { FormInput } from '../../components/form-input';
import { Form } from '../../components/form';
import { validator } from '../../utils/helpers';
import { InputError } from '../../components/input-error';
import UserController from '../../controllers/user-controller';
import { UserData } from '../../api/auth-api';
import { withStore } from '../../utils/store';

interface ProfileProps extends UserData {}

const userFields = [
  'email',
  'login',
  'first_name',
  'second_name',
  'display_name',
  'phone',
] as Array<keyof ProfileProps>;

export class ProfileEditInfoPageBase extends Block {
  protected init() {
    this.children.form = this.createForm();
  }

  protected componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
    this.children.form = this.createForm();

    return true;
  }

  createForm() {
    return new Form({
      name: 'settings',
      submitText: 'Сохранить',
      fields: userFields.map((name) => new FormInput({
        value: this.props[name],
        name,
        id: name,
        placeholder:
            name === 'email'
              ? 'Почта'
              : name === 'login'
                ? 'Логин'
                : name === 'first_name'
                  ? 'Имя'
                  : name === 'second_name'
                    ? 'Фамилия'
                    : name === 'display_name'
                      ? 'Имя в чате'
                      : 'Телефон',
        type: name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text',
      })),
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          this.handleSubmit();
        },
      },
    });
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

    UserController.editUserInfo(values);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => {
  const userData = state.user.data || {};
  userData.isLoading = state.user.isLoading;

  return userData;
});

export const ProfileEditInfoPage = withUser(ProfileEditInfoPageBase);
