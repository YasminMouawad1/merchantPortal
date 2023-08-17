import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
//import { ToastService } from '../../../core/components/toast/toast.service';
// temp vars

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    // private _authService: AuthService,
   // private _toastService: ToastService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
  //   // const token =
    //   sessionStorage.getItem('access_token');
    // // localStorage.getItem('access_token');

    // if (token) {
      return true;
    // } else {
    //   this.router.navigate(['auth'])
    //   return false;
    // }
    // if (this._authService.checkIfLoggedIn()) {
    //   // let routerRoles = route.data.roles;
    //   // let currentUserRole = sessionStorage.getItem('MASTER_ROLE');
    //   // if (routerRoles && routerRoles.indexOf(currentUserRole) === -1) {
    //   //   // role not authorised so redirect to home page
    //   //   this._toastService.error('عفوا,ليس لديك صلاحية لدخول هذه الصفحة.');
    //   //   return false;
    //   // } 
    //   return true
    // } else {
    //   this.router.navigate(['auth/login']);
    // } 

  // }

  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   return this.canActivate(route, state);
  // }

  // checkLogin(role: string, permissions?: string[]): boolean {
  //   if (this.authService.checkIfLoggedIn()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //   }

  //   return false;
  }
}
