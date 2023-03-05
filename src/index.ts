import Handlebars from 'handlebars/dist/handlebars.runtime';

import { TestPage } from './pages/test-page';

import Navigation from './components/navigation/navigation.hbs';
import FormInput from './components/form-input/form-input.hbs';
import ChatItem from './components/chat-item/chat-item.hbs';
import ChatMessage from './components/chat-message/chat-message.hbs';
import Error from './components/error/error.hbs';

import avatar from './assets/user.png';
import Block from './utils/block';
import { SigninPage } from './pages/signin';
import { SignupPage } from './pages/signup';
import { ChatPage } from './pages/chat';
import { ProfilePage } from './pages/profile';
import { ProfileEditInfoPage } from './pages/profile-edit-info';
import { ProfileEditPasswordPage } from './pages/profile-edit-password';
import { NotFoundPage } from './pages/not-found';
import { ServerErrorPage } from './pages/server-error';
import { submit } from './utils/helpers';

Handlebars.registerPartial({
  Navigation,
  FormInput,
  ChatItem,
  ChatMessage,
  Error,
});

function render(html) {
  const app = document.querySelector('#root');

  if (app === null) {
    return;
  }

  app.append(html.getContent()!);
  html.dispatchComponentDidMount();
}

const ROUTES: Record<'SIGNIN' |
    'SIGNUP' |
    'CHAT' |
    'PROFILE' |
    'PROFILE_EDIT' |
    'PASSWORD_EDIT' |
    'NOT_FOUND' |
    'SERVER_ERROR' |
    'TEST_PAGE', Block> = {
      SIGNIN: new SigninPage(),
      SIGNUP: new SignupPage(),
      CHAT: new ChatPage({
        avatar,
        events: {
          submit,
        },
      }),
      PROFILE: new ProfilePage({ avatar }),
      PROFILE_EDIT: new ProfileEditInfoPage({
        events: {
          submit,
        },
      }),
      PASSWORD_EDIT: new ProfileEditPasswordPage({
        events: {
          submit,
        },
      }),
      NOT_FOUND: new NotFoundPage(),
      SERVER_ERROR: new ServerErrorPage(),
      TEST_PAGE: new TestPage(),
    };

declare global {
  interface Window {
    goTo: (route: string) => void
  }
}

window.goTo = function (route) {
  const page = ROUTES[route];

  // Временный костыль для для очистки содержимого страницы
  const app = document.querySelector('#root');
  if (app === null) return;
  app.innerHTML = '';

  render(page);
};

window.addEventListener('DOMContentLoaded', () => {
  render(ROUTES.SIGNIN);
});
