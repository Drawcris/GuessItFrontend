import {Routes} from '@angular/router';
import {LoginPage} from './auth/pages/login-page/login-page';
import {RegisterPage} from './auth/pages/register-page/register-page';
import {HomePage} from './home/pages/home-page/home-page';

const routeConfig: Routes = [
  {
    path: 'login',
    component: LoginPage,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterPage,
    title: 'Register',
  },
  {
    path: '',
    component: HomePage,
    title: 'Home',
  }]

export default routeConfig;
