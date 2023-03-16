import Block from '../../utils/block';
import template from './avatar-input.hbs';
import styles from './styles.module.pcss';

interface AvatarInputProps {
  path: string
  events?: {
    change: (event: Event) => void
  }
}

export class AvatarInput extends Block {
  constructor(props: AvatarInputProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
