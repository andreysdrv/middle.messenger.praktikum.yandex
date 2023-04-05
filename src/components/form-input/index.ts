import Block from '../../utils/block';
import template from './form-input.hbs';
import styles from './form-input.module.pcss';
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
    super({
      ...props,
      events: {
        focusout: (e: FocusEvent) => {
          const target = e.target as HTMLInputElement;
          if (validator(target).isValid) {
            (this.children.error as InputError).setProps({ errorText: '' });
          } else {
            (this.children.error as InputError).setProps({ errorText: validator(target).error });
          }
        },
      },
    });
  }

  init() {
    this.children.error = new InputError({
      name: this.props.name as string,
      errorText: '',
    });
  }

  // @ts-ignore
  componentDidUpdate(oldProps, newProps): boolean {
    return oldProps.errorText !== newProps.errorText;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
