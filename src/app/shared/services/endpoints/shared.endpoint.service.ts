import { Injectable } from '@angular/core';
import { environment } from 'projects/public/src/environments/environment';
import { APIService } from '../../../core/services/http/api.service';
import { UrlEndpoints } from '../../constants/url-endpoints';


@Injectable({ providedIn: 'root' })
export class SharedEndpoints {
  constructor(private _API: APIService) { }
  setAPI_RootIfUserOrAPI_AdminIfAdmin() {
    if (localStorage.getItem('ROLE') === 'user') {
      this._API.setURI(environment.apiRoot);
    } else {
      // this._APIService.setURI(environment.apiRootAdmin);
    }
  }

  getTest(id: string) {
    this.setAPI_RootIfUserOrAPI_AdminIfAdmin();
    return this._API.doGet(UrlEndpoints.GET_TEST + '/' + id);
  }

}
