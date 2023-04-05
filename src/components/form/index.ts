import Block from '../../utils/block';
import template from './form.hbs';
import styles from './form.module.pcss';
import { FormInput } from '../form-input';
import { Link } from '../link';

interface FormProps {
    name: string
    title?: string
    avatar?: any
    submitText?: string
    redirectText?: string
    redirectPath?: string
    fields: FormInput[] | FormInput
    events?: {
        submit: (event: Event) => void
    }
}

export class Form extends Block {
  constructor(props: FormProps) {
    super({ ...props });
  }

  protected init() {
    this.children.link = new Link({
      label: this.props.redirectText,
      to: this.props.redirectPath,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
