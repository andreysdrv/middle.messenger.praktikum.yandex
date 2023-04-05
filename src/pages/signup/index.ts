import Block from '../../utils/block';
import template from './signup.hbs';
import { Form } from '../../components/form';
import { FormInput } from '../../components/form-input';
import { validator } from '../../utils/helpers';
import { InputError } from '../../components/input-error';
import AuthController from '../../controllers/auth-controller';

export class SignupPage extends Block {
  constructor() {
    super({});
  }

  protected init() {
    this.children.form = new Form({
      name: 'signin',
      title: 'Регистрация',
      submitText: 'Создать аккаунт',
      redirectText: 'Войти',
      redirectPath: '/sign-in',
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
        }),
      ],
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

    // @ts-ignore
    (this.children.form.children.fields as FormInput[]).forEach((field) => {
      const input = field.element!.querySelector('input') as HTMLInputElement;

      if (validator(input).isValid) {
        (field.children.error as InputError).setProps({ errorText: '' });
      } else {
        (field.children.error as InputError).setProps({ errorText: validator(input).error });
      }

      values[input.name] = input!.value;
    });

    // @ts-ignore
    AuthController.signup(values);
  }

  render() {
    return this.compile(template, this.props);
  }
}
