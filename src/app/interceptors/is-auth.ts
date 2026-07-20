// import { HttpInterceptorFn } from '@angular/common/http';

// export const isAuthInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('isAuth');

//   if (token) {
//     const newReq = req.clone({
//       setHeaders: {
//         token: `Bearer ${token}`
//       }
//     });
//     return next(newReq);
//   }

//   return next(req);
// };
import { HttpInterceptorFn } from '@angular/common/http';

export const isAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('isAuth');

  if (token) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Changed from 'token: token' to standard Bearer format
      }
    });
    return next(newReq);
  }

  return next(req);
};
