import Block from '../../utils/block';
import template from './error.hbs';
import styles from './error.module.pcss';

interface ErrorProps {
    code: number
    title: string
    redirectPath: string,
    redirectText: string
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
