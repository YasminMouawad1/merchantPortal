import { Injectable } from '@angular/core';
import { APIService } from '../../../core/services/http/api.service';
import { UrlEndpoints } from '../../constants/url-endpoints';

@Injectable({
  providedIn: 'root'
})
export class LookUpsService {

  constructor(private _API: APIService) { }

  getClubIds(){
    return this._API.doGet(UrlEndpoints.GET_ClubIds)
  }

  addClubId(newClub:any){
    return this._API.doPost(UrlEndpoints.POST_ClubId , newClub)
  }

  getCarBrands(){
    return this._API.doGet(UrlEndpoints.GET_CarBrand)
  }

  addCarBrand(newCarBrand:any){
    return this._API.doPost(UrlEndpoints.POST_CarBrand , newCarBrand)
  }

  addCarModel(newCarModel: any){
    return this._API.doPost(UrlEndpoints.POST_CarModel , newCarModel)
  }

  getGovernorates(){
    return this._API.doGet(UrlEndpoints.GET_Governorates)

  }
  getEmploymentTypes(){
    return this._API.doGet(UrlEndpoints.GET_EmploymentTypes)

  }


}
