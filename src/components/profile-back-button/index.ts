import template from './profile-back-button.hbs';
import styles from './styles.module.pcss';
import Block from '../../utils/block';

interface ProfileBackButtonProps {
    events: {
        click: () => void
    }
}

export class ProfileBackButton extends Block {
  constructor(props: ProfileBackButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
