import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const teacherGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)

  if (!authService.isTeacher()) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
