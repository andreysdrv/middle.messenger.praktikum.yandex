import Block from '../../utils/block';
import template from './form.hbs';
import { FormInput } from '../form-input';
import { validator } from '../../utils/helpers';

interface FormProps {
    name: string
    title?: string
    submitText?: string
    redirectText?: string
    fields: FormInput[] | FormInput
}

export class Form extends Block {
  constructor(props: FormProps) {
    super('form', {
      ...props,
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const values: Record<string, string> = {};

          (this.children.fields as FormInput[]).forEach((field) => {
            const input = field.element!.querySelector('input');
            if (validator(input).isValid) {
              field.children.error.setProps({ errorText: '' });
            } else {
              field.children.error.setProps({ errorText: validator(input).error });
            }

            values[input.name] = input.value;
          });

          console.log(values);
        },
      },
    });
  }

  protected init() {
    this.element!.classList.add('form');
    // @ts-ignore
      this.element!.setAttribute('name', this.props.name);
  }

  render() {
    return this.compile(template, this.props);
  }
}
