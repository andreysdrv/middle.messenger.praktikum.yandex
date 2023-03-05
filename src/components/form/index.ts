import Block from '../../utils/block';
import template from './form.hbs';
import { FormInput } from '../form-input';

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
          const form = event.target as HTMLFormElement;
          const values = {};
          form.querySelectorAll('input')
            .forEach((field) => {
              values[field.name] = field.value;
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
