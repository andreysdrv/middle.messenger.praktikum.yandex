import Router from './utils/router';
import { SigninPage } from './pages/signin';
import { SignupPage } from './pages/signup';
import { ChatPage } from './pages/chat';
import { ProfilePage } from './pages/profile';
import { ProfileEditInfoPage } from './pages/profile-edit-info';
import { ProfileEditPasswordPage } from './pages/profile-edit-password';
import AuthController from './controllers/auth-controller';

enum Routes {
    Index = '/',
    SignUp = '/signup',
    SignIn = '/signin',
    Chat = '/chat',
    Profile = '/profile',
    ProfileEditInfo = '/profile-info',
    ProfileEditPassword = '/profile-password',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, SigninPage)
    .use(Routes.SignUp, SignupPage)
    .use(Routes.SignIn, SigninPage)
    .use(Routes.Chat, ChatPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.ProfileEditInfo, ProfileEditInfoPage)
    .use(Routes.ProfileEditPassword, ProfileEditPasswordPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
