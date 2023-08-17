import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class APIService {
  private baseURI: string = environment.apiRoot;

  constructor(private http: HttpClient) {}

  public setURI(baseUrl: string): void {
    this.baseURI = baseUrl;
  }



  doPost(
    endpint: string,
    body: any,
    options: object = {},
    baseUrl?: string
  ): Observable<any> {
    const urlRoot = baseUrl || this.baseURI;
    return this.http.post(`${urlRoot}/${endpint}`, body, options);
  }

   doGet(
    endpint: string,
    options: object = {},
    baseUrl?: string
  ): Observable<any> {
    const urlRoot = baseUrl || this.baseURI;
    return this.http.get(`${urlRoot}/${endpint}`, options); 
  }


   doDelete(
    endpint: string,
    options: object = {},
    baseUrl?: string
  ): Observable<any> {
    const urlRoot = baseUrl || this.baseURI;
    return this.http.get(`${urlRoot}/${endpint}`, options);  
  }

  doPut(
    endpint: string,
    body: any,
    options: object = {},
    baseUrl?: string
  ): Observable<any> {
    const urlRoot = baseUrl || this.baseURI;
    const data = { body, options }
    return this.http.put(`${urlRoot}/${endpint}`, data, options); 
  }
}
