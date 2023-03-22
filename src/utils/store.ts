import { UserData } from '../api/auth-api';
import { set } from './helpers';
import EventBus from './event-bus';
import Block from './block';
import { ChatData, ChatsData } from '../api/chats-api';
import { Message } from '../controllers/messages-controller';

interface State {
  user: {
    data?: UserData
    error?: string
    isLoading?: boolean
  },
  chats: {
    data?: ChatsData
    error?: string
    isLoading?: boolean
  },
  selectedChatId?: number
  selectedChatState?: ChatData
  messages: Record<number, Message[]>
  modals: {
    createChat: {
      isOpen: boolean
    },
  }
}

enum StoreEvent {
    Updated = 'updated'
}

class Store extends EventBus {
  private state: State = {
    user: {},
    chats: {},
    modals: {
      createChat: {
        isOpen: false,
      },
    },
    messages: {},
  };

  getState(): State {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvent.Updated, this.state);
  }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => (
  Component: typeof Block<any>,
) => {
  let propsFromState: any;

  return class WithStore extends Component {
    constructor(props: any) {
      propsFromState = mapStateToProps(store.getState());
      super({ ...props, ...propsFromState });

      store.on(StoreEvent.Updated, (newState: any) => {
        const newPropsFromState = mapStateToProps(newState);

        // if (isEqual(propsFromState, newPropsFromState)) {
        //   return;
        // }

        propsFromState = { ...newPropsFromState };

        this.setProps({ ...propsFromState });
      });
    }
  };
};

export default store;
