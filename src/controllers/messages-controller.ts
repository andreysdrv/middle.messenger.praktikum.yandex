import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import store from '../utils/store';

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.get(id)) {
      return;
    }
    const { user } = store.getState();
    const transport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${user.data?.id}/${id}/${token}`);
    await transport.connect();
    this.sockets.set(id, transport);
    this.fetchOldMessages(id);
    this.subscribe(transport, id);
  }

  sendMessage(id: number, message: string) {
    const transport = this.sockets.get(id);

    if (!transport) {
      throw new Error('Channel is closed');
    }

    transport.send({ type: 'message', content: message });
  }

  fetchOldMessages(id: number) {
    const transport = this.sockets.get(id);

    if (!transport) {
      throw new Error('Channel is closed');
    }

    transport.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    // @ts-ignore
    Object.entries(this.sockets).forEach((socket) => socket.close());
  }

  private onMessage(id: number, messages: Message | Message[]) {
    const storeKey = `messages.${id}`;

    if (Array.isArray(messages)) {
      store.set(storeKey, messages);

      return;
    }

    const oldMessage = store.getState().messages[id];

    if (!oldMessage) {
      store.set(storeKey, [messages]);

      return;
    }

    store.set(storeKey, [...oldMessage, messages]);
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(
      WSTransportEvents.Message,
      (message: Message | Message[]) => this.onMessage(id, message),
    );
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

export default new MessagesController();
