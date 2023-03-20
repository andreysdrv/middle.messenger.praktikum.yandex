import Block from '../../utils/block';
import template from './link.hbs';
import { PropsWithRouter, withRouter } from '../../hocs/with-router';
import styles from './styles.module.pcss';

interface BaseLinkProps extends PropsWithRouter {
    to: string;
    label: string;
    events?: {
        click: () => void;
    };
}

export class BaseLink extends Block {
  constructor(props: BaseLinkProps) {
    super(
      {
        ...props,
        events: {
          click: () => this.navigate(),
        },
      },
    );
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(BaseLink);
