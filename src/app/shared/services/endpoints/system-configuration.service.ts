import { Injectable } from '@angular/core';
import { APIService } from '../../../core/services/http/api.service';
import { UrlEndpoints } from '../../constants/url-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigurationService {

  constructor(private _api: APIService) { }

async  geSystemConfiguration(){
    return await this._api.doGet(UrlEndpoints.GET_SystemConfiguration)
  }
  async GetSystemConfigurationProfessionsList(){
    return await this._api.doGet(UrlEndpoints.Get_SystemConfigurationProfessionsList)
  }

  async  GetSystemConfigurationProfessionsById(id: number){
    return await this._api.doGet(UrlEndpoints.Get_SystemConfigurationProfessionsById+id)
  }



 updateSystemCoreConfiguration(configuration: any){
    return   this._api.doPost(UrlEndpoints.Update_SystemCoreConfiguration, configuration)
  }

}
