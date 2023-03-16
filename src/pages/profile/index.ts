import Block from '../../utils/block';
import template from './profile.hbs';
import { FormInput } from '../../components/form-input';
import { Form } from '../../components/form';
import { ProfileButton } from '../../components/profile-button';
import AuthController from '../../controllers/auth-controller';
import { withStore } from '../../utils/store';
import router from '../../utils/router';
import { UserData } from '../../api/auth-api';
import { AvatarInput } from '../../components/avatar-input';
import UserController from '../../controllers/user-controller';

interface ProfileProps extends UserData {}

const userFields = [
  'email',
  'login',
  'first_name',
  'second_name',
  'display_name',
  'phone',
] as Array<keyof ProfileProps>;

class ProfilePageBase extends Block {
  protected init() {
    this.children.form = this.createForm();

    this.children.buttons = [
      new ProfileButton({
        label: 'Изменить данные',
        events: {
          click: () => {
            router.go('/profile-info');
          },
        },
      }),
      new ProfileButton({
        label: 'Изменить пароль',
        events: {
          click: () => {
            router.go('/profile-password');
          },
        },
      }),
      new ProfileButton({
        label: 'Выйти',
        variant: 'red',
        events: {
          click: () => {
            AuthController.logout();
          },
        },
      }),
    ];
  }

  protected componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
    this.children.form = this.createForm();

    return true;
  }

  createForm() {
    return new Form({
      name: 'settings-disabled',
      avatar: new AvatarInput({
        path: this.props.avatar,
        events: {
          change: (event: Event) => {
            const target = event.target as HTMLInputElement;
            const data = new FormData();
            data.append('avatar', target.files![0]);
            UserController.editUserAvatar(data);
          },
        },
      }),
      title: this.props.first_name,
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
        disabled: true,
        type: name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text',
      })),
    });
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

export const ProfilePage = withUser(ProfilePageBase);
