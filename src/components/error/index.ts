import Block from '../../utils/block';
import template from './error.hbs';

interface ErrorProps {
    code: number
    title: string
    redirectPath: string,
    redirectText: string
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super('div', props);
  }

  init() {
    this.element!.classList.add('error');
  }

  render() {
    return this.compile(template, this.props);
  }
}
