import Block from '../../utils/block';
import template from './profile-link.hbs';
import styles from './styles.module.pcss';
import { withRouter } from '../../hocs/with-router';
import router from '../../utils/router';

interface ProfileBaseLinkProps {
    label: string
    to: string
    events?: {
        click: () => void
    }
}

export class ProfileBaseLink extends Block {
  constructor(props: ProfileBaseLinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const ProfileLink = withRouter(ProfileBaseLink);
