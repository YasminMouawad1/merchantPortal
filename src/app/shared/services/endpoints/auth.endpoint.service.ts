import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { APIService } from '../../../core/services/http/api.service';
import { UrlEndpoints } from '../../constants/url-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthEndpoints {

  userData = new BehaviorSubject(null); 
  
  constructor(private _API: APIService,private _Router:Router) {
    
      if(sessionStorage.getItem('access_token')){
        this.saveUserData();
      }

  }

  get token(){
    return sessionStorage.getItem('access_token');
  }


  postTokenAuthAuthenticate(body: any) {
    return this._API.doPost(UrlEndpoints.POST_TOKEN_AUTH, body);
  }

  
 
  getMerchantDetails(){
    return this._API.doGet(UrlEndpoints.GET_MerchantDetails)
  }


  logout(){
    sessionStorage.removeItem('access_token');
    this.userData.next(null);
    this._Router.navigate(['auth']);
  }

  saveUserData(){
    let encodeToken = JSON.stringify(sessionStorage.getItem('access_token'));
    let decodeToken:any = jwtDecode(encodeToken);
    this.userData.next(decodeToken); 
}

}

