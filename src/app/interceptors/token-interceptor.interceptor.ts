import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StateService } from '../services/state.service';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`in the interceptor room `, req);
  const reqWithToken = req.clone({
    headers: req.headers.set(
      'Authorization',
      `Bearer ${inject(StateService).state().jwtToken}`
    ),
  });
  return next(reqWithToken);
};
