import { UserData } from '../api/auth-api';
import { set } from './helpers';
import EventBus from './event-bus';
import Block from './block';

interface State {
    user: {
      data?: UserData
      error?: string
      isLoading?: boolean
    }
}

enum StoreEvent {
    Updated = 'updated'
}

class Store extends EventBus {
  private state: State = { user: {} };

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

      store.on(StoreEvent.Updated, (newState) => {
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
