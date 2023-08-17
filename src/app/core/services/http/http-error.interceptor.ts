import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { SpinnerService } from './../../../shared/services/endpoints/spinner.service';
import { Observable, tap} from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private _spinnerService:SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._spinnerService.requestStarted();
    return this.handler(next,request);
  }

  handler(next: HttpHandler,request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    return next.handle(request)
        .pipe(
          tap({
            next: (event): void => {
              if(event instanceof HttpResponse){
                 this._spinnerService.requestEnded();
               }  
            },
            error: (error:HttpErrorResponse) =>{
              this._spinnerService.resetSpinner();
              throw error;
            }, 
          })
      );
 }
}
