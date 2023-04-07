import Block from '../../utils/block';
import template from './input-error.hbs';
import styles from './input-error.module.pcss';

interface InputErrorProps {
    name: string
    errorText: string
}

export class InputError extends Block {
  constructor(props: InputErrorProps) {
    super(props);
  }

  // @ts-ignore
  componentDidUpdate(oldProps, newProps): boolean {
    return oldProps.errorText !== newProps.errorText;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
