import Block from '../../utils/block';
import template from './form-input.hbs';

interface FormInputProps {
    type: string
    id: string
    name: string
    placeholder: string
    errorText?: string
    disabled?: boolean
    value?: string
}

export class FormInput extends Block {
  constructor(props: FormInputProps) {
    super('div', props);
  }

  init() {
    this.element!.classList.add('form__input-wrapper');
  }

  render() {
    return this.compile(template, this.props);
  }
}
