import Block from '../../utils/block';
import template from './form-input.hbs';
import { InputError } from '../input-error';
import { validator } from '../../utils/helpers';

interface FormInputProps {
    type: string
    id: string
    name: string
    placeholder: string
    disabled?: boolean
    value?: string
}

export class FormInput extends Block {
  constructor(props: FormInputProps) {
    super('div', {
      ...props,
      events: {
        focusout: ({ target }) => {
          if (validator(target).isValid) {
            this.children.error.setProps({ errorText: '' });
          } else {
            this.children.error.setProps({ errorText: validator(target).error });
          }
        },
      },
    });
  }

  init() {
    this.element!.classList.add('form__input-wrapper');

    this.children.error = new InputError({
      name: this.props.name as string,
      errorText: '',
    });
  }

  componentDidUpdate(oldProps, newProps): boolean {
    return oldProps.errorText !== newProps.errorText;
  }

  render() {
    return this.compile(template, this.props);
  }
}
