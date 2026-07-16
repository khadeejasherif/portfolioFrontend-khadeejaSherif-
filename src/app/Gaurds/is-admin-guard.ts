import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServices } from '../services/user-services';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserServices);
  const token = localStorage.getItem('isAuth');

  // If there's no auth token at all, stop right here
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Ask the backend database for confirmation
  const profileCheck = userService.getProfile();
  if (!profileCheck) {
    return of(false);
  }
  
  return profileCheck.pipe(
    map((res: any) => {
      // res.user.role matches  backend req.user 
      if (res && res.user && res.user.role === 'admin') {
        return true; 
      }
      // If logged in but not an admin, push back to home
      router.navigate(['/home']);
      return false;
    }),
    catchError((err) => {
      console.error('Admin Guard DB Error:', err);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
