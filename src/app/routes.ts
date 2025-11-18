import {Routes} from '@angular/router';
import {LoginPage} from './auth/pages/login-page/login-page';
import {RegisterPage} from './auth/pages/register-page/register-page';
import {HomePage} from './home/pages/home-page/home-page';

const routeConfig: Routes = [
  {
    path: 'login',
    component: LoginPage,
    title: 'GuessIt - Logowanie',
  },
  {
    path: 'register',
    component: RegisterPage,
    title: 'GuessIt - Rejestracja',
  },
  {
    path: '',
    component: HomePage,
    title: 'GuessIt - Strona Główna',
  }]

export default routeConfig;
