import Block from '../../utils/block';
import template from './chat-add-button.hbs';
import styles from './styles.module.pcss';

interface ChatAddButtonProps {
  events: {
    click: (event: Event) => void
  }
}

export class ChatAddButton extends Block {
  constructor(props: ChatAddButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
