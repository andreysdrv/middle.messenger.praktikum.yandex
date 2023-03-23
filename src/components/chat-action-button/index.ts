import Block from '../../utils/block';
import template from './chat-action-button.hbs';
import styles from './styles.module.pcss';

interface ChatActionButtonProps {
    label: string,
    events: {
        click: () => void
    }
}

export class ChatActionButton extends Block {
  constructor(props: ChatActionButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
