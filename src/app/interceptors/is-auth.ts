import { HttpInterceptorFn } from '@angular/common/http';

export const isAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('isAuth');

  if (token) {
    const newReq = req.clone({
      setHeaders: {
        token: token 
      }
    });
    return next(newReq);
  }

  return next(req);
};