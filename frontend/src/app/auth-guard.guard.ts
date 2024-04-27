import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  console.log(authService.checkLogin());
  if (!authService.checkLogin()) {
    inject(Router).navigate(['signin']);
  }
  return authService.checkLogin();
};
