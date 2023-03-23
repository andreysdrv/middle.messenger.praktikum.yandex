import Block from '../../utils/block';
import template from './profile-button.hbs';
import styles from './styles.module.pcss';

interface ProfileButtonProps {
    label: string
    variant?: 'red'
    events?: {
        click: () => void
    }
}

export class ProfileButton extends Block {
  constructor(props: ProfileButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
