import { Routes } from '@angular/router';
import { LoginPage } from './auth/pages/login-page/login-page';
import { RegisterPage } from './auth/pages/register-page/register-page';
import { HomePage } from './home/pages/home-page/home-page';
import { authGuard, teacherGuard } from './guards/auth-guard';
import { TeacherDashboard } from './Teacher-Panel/pages/teacher-dashboard/teacher-dashboard';
import { UserDashboard } from './User-Panel/pages/user-dashboard/user-dashboard';

export const routes: Routes = [{
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
    canActivate: [authGuard],
  },
  {
    path: 'teacher-dashboard',
    component: TeacherDashboard,
    title: 'GuessIt - Panel Nauczyciela',
    canActivate: [authGuard],
  },
  {
    path: 'user-dashboard',
    component: UserDashboard,
    title: 'GuessIt - Panel Użytkownika',
    canActivate: [authGuard],
  }
];
