import Block from '../../utils/block';
import template from './modal-with-form.hbs';
import CloseButtonTemplate from './close-button.hbs';
import styles from './styles.module.pcss';
import { Form } from '../form';
import { withStore } from '../../utils/store';

interface ModalWithFormBaseProps {
  form: Form,
  onCloseClick: () => void
}

export class ModalWithFormBase extends Block {
  constructor(props: ModalWithFormBaseProps) {
    super({ ...props });
  }

  protected init() {
    this.children.button = new CloseButton({
      events: {
        click: () => this.props.onCloseClick(),
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withModalWithForm = withStore((state) => state.modals.createChat);

export const ModalWithForm = withModalWithForm(ModalWithFormBase);

interface CloseButtonProps {
  events: {
    click: (e: Event) => void
  }
}

class CloseButton extends Block {
  constructor(props: CloseButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(CloseButtonTemplate, { ...this.props, styles });
  }
}
