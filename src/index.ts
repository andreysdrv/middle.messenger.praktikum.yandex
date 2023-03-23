import Router from './utils/router';
import { SigninPage } from './pages/signin';
import { SignupPage } from './pages/signup';
import { MessengerPage } from './pages/messenger';
import { ProfilePage } from './pages/profile';
import { ProfileEditInfoPage } from './pages/profile-edit-info';
import { ProfileEditPasswordPage } from './pages/profile-edit-password';
import AuthController from './controllers/auth-controller';

enum Routes {
    Index = '/',
    SignUp = '/sign-up',
    SignIn = '/sign-in',
    Messenger = '/messenger',
    Profile = '/profile',
    Settings = '/settings',
    Password = '/password',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, SigninPage)
    .use(Routes.SignUp, SignupPage)
    .use(Routes.SignIn, SigninPage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Settings, ProfileEditInfoPage)
    .use(Routes.Password, ProfileEditPasswordPage);

  let isProtectedRoute: boolean;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
    default: isProtectedRoute = true;
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
