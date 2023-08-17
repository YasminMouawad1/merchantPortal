import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthEndpoints } from './auth.endpoint.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurdGuard implements CanActivate {
  constructor(private _AuthEndpoints:AuthEndpoints, private _Router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      
      if(this._AuthEndpoints.userData.getValue() != null){
        return true;
      }
      else{
        this._Router.navigate(['auth']);
        return false;
      }

  }
  
}
