import Block from '../../utils/block';
import template from './modal-with-form.hbs';
import CloseButtontemplate from './close-button.hbs';
import styles from './styles.module.pcss';
import { Form } from '../form';
import { FormInput } from '../form-input';
import ChatsController from '../../controllers/chats-controller';
import { withStore } from '../../utils/store';

export class ModalWithFormBase extends Block {
  protected init() {
    this.children.form = new Form({
      name: 'create_chat',
      fields: [
        new FormInput({
          type: 'text',
          name: 'create_chat',
          placeholder: 'Введите название чата',
          id: 'create_chat',
        }),
      ],
      title: 'Создать новый чат',
      submitText: 'Создать',
      events: {
        submit: (e) => {
          const target = e.target as HTMLInputElement;
          const title = target.querySelector('input')!.value;

          ChatsController.create({ title });
        },
      },
    });

    this.children.button = new CloseButton({
      events: {
        click: () => {
          ChatsController.closeCreateChatModal();
        },
      },
    });
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.form = new Form({
      name: 'create_chat',
      fields: [
        new FormInput({
          type: 'text',
          name: 'create_chat',
          placeholder: 'Введите название чата',
          id: 'create_chat',
        }),
      ],
      title: 'Создать новый чат',
      submitText: 'Создать',
      events: {
        submit: (e) => {
          const target = e.target as HTMLInputElement;
          const title = target.querySelector('input')!.value;

          ChatsController.create({ title });
        },
      },
    });

    return true;
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
    return this.compile(CloseButtontemplate, { ...this.props, styles });
  }
}
