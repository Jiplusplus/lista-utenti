import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  console.log("verifico guard");
  const router = inject(Router);

  let service = inject(AuthService);
  let check = service.checkToken();

  if(!check){
    console.log('ridirigo verso /login');
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
