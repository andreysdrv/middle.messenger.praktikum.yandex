import Block from '../../utils/block';
import template from './input-error.hbs';

interface InputErrorProps {
    name: string
    errorText: string
}

export class InputError extends Block {
  constructor(props: InputErrorProps) {
    super('span', props);
  }

  init() {
    this.element!.classList.add('form__input-error');
    this.element!.classList.add(`${this.props.name}-input-error`);
  }

  componentDidUpdate(oldProps, newProps): boolean {
    return oldProps.errorText !== newProps.errorText;
  }

  render() {
    return this.compile(template, this.props);
  }
}
