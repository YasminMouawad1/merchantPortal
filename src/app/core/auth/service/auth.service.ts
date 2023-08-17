import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';  
import { MerchantDetail } from '../../models/merchant-detail';
import { AuthEndpoints } from 'src/app/shared/services/endpoints/auth.endpoint.service';
 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<MerchantDetail>;
  public MerchantDetils: Observable<MerchantDetail>;

  constructor(private http: HttpClient, private router: Router,
    private _authEndpoints: AuthEndpoints) {
    this.userSubject = new BehaviorSubject<MerchantDetail>(
      JSON.parse(localStorage.getItem('currentDetails')|| '{ }')
    );
    this.MerchantDetils = this.userSubject.asObservable();
  }

  public get detilsValue(): MerchantDetail {
    return this.userSubject.value;
  }

  saveDetails() {

    
    this._authEndpoints.getMerchantDetails().subscribe(res => {
             
      let details: MerchantDetail = {
        merchantLogo: 'data:image/jpg;base64,'+ res.data.merchantLogo,
        merchantCode: res.data.merchantLMCode,
        merchantName:res.data.merchantName
      };

      localStorage.setItem('currentDetails', JSON.stringify(details));
       
      this.userSubject.next(details);
 
    }); 
          
  }

  clearDetails() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null!);
  }
}