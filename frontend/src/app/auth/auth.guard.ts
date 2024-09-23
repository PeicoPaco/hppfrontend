import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let routerService = inject(Router);
  if (!authService.isLoggedIn()) {
    routerService.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data?.['role'] as string[];
  const userRole = authService.getRole();

  if (userRole && allowedRoles && !allowedRoles.includes(userRole)) {
    routerService.navigate(['/requests']);
    return false;
  }

  return true;
};