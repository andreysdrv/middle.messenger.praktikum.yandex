import Block from '../../utils/block';
import template from './form.hbs';
import { FormInput } from '../form-input';

interface FormProps {
    name: string
    title: string
    submitText: string
    redirectText: string
    fields: FormInput[] | FormInput
}

export class Form extends Block {
  constructor(props: FormProps) {
    super('form', props);
  }

  protected init() {
    this.element!.classList.add('form');
    this.element!.setAttribute('name', this.props.name);
  }

  render() {
    return this.compile(template, this.props);
  }
}
