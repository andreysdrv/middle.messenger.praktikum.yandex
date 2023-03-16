import Block from '../../utils/block';
import template from './signin.hbs';
import { FormInput } from '../../components/form-input';
import { Form } from '../../components/form';
import { validator } from '../../utils/helpers';
import { InputError } from '../../components/input-error';
import AuthController from '../../controllers/auth-controller';

export class SigninPage extends Block {
  constructor() {
    super({});
  }

  protected init() {
    this.children.form = new Form({
      name: 'login',
      title: 'Вход',
      submitText: 'Войти',
      redirectText: 'Ещё не зарегистрированы?',
      redirectPath: '/signup',
      fields: [
        new FormInput({
          type: 'text',
          id: 'login',
          name: 'login',
          placeholder: 'Логин',
        }),
        new FormInput({
          type: 'password',
          id: 'password',
          name: 'password',
          placeholder: 'Пароль',
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

    (this.children.form.children.fields as FormInput[]).forEach((field) => {
      const input = field.element!.querySelector('input') as HTMLInputElement;

      if (validator(input).isValid) {
        (field.children.error as InputError).setProps({ errorText: '' });
      } else {
        (field.children.error as InputError).setProps({ errorText: validator(input).error });
      }

      values[input.name] = input!.value;
    });

    AuthController.signin(values);
  }

  render() {
    return this.compile(template, this.props);
  }
}
