import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/http/api.service';
import { UrlEndpoints } from '../../constants/url-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _API: APIService , private http: HttpClient) { }

  // Get All Users List
  getUsersList(){
    return this._API.doGet(UrlEndpoints.GET_UsersList)
  }

  getMerchantDetails(){
    return this._API.doGet(UrlEndpoints.GET_MerchantDetails)
  }

  getUserById(id: string){
return this._API.doGet(UrlEndpoints.GET_UserById + id)
  }

  postUser(userApprove: any){
    return this._API.doPost(UrlEndpoints.POST_ApproveUser, userApprove)
  }


  getMerchantLoansById(id :number): Observable<any> {
    
    return  this._API.doGet(UrlEndpoints.Get_IntegrationMerchantLoans+id);
  }
   claimRequestsForMerchant(id :number): Observable<any> {
    
    return  this._API.doGet  (UrlEndpoints.Get_IntegrationMerchantClaimRequests + id);
  }

  confirm( list:any ): Observable<any> {

    return  this._API.doPost(UrlEndpoints.Post_IntegrationRequestClaim, list);
  }

  integrationClaimsPDF(claimNo:number, merchantCode:number): Observable<any> {
    
    return  this._API.doPost(UrlEndpoints.Post_IntegrationClaimsPDF + merchantCode + '&claimId='+claimNo,{});
  }

  changePassword(body: any) {
    return this._API.doPost(UrlEndpoints.POST_CHANGE_PASSWORD, body);
  }
  
}
