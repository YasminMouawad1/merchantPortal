import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LanguageService } from '../language/language.service';
import { HandleErrorService } from '../http/handle-error.service';
// import { OAuthService } from 'angular-oauth2-oidc'; 
@Injectable({
  providedIn: 'root',
})
export class AppInterceptor implements HttpInterceptor {
  recaptchaToken: string = '';
  urlsToNotUse: Array<string> = [
  ];
  constructor(
    private _languageService: LanguageService,
    private _handleErrorService: HandleErrorService,
    // private _oauthService: OAuthService,

  ) {
    // this._oauthService.setupAutomaticSilentRefresh();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string =
      sessionStorage.getItem('access_token') || 'Basic c2NlOnNjZQ==';

    if (this.isValidRequestForInterceptor(request.url)) {
      let modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });

      return next.handle(modifiedRequest).pipe(
        map((event: HttpEvent<any>) => { 
          return event; 
        }),

        catchError((errorResponse) => { 
          return this._handleErrorService.logError(errorResponse);
        })
      );
    }

    // if (!request.headers.has('Content-type')) {
    //   if (!(request.body instanceof FormData)) {
    //     request = request.clone({
    //       headers: request.headers.set('Content-type', 'Application/json'),
    //     });
    //   } else {
    //     request = request.clone({
    //       headers: request.headers.set('content-Type', "multipart/form-data; boundary='----arbitrary boundary'"),
    //     });
    //   }
    // }


    if (!request.headers.has('Authorization')) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    if (!request.headers.has('lang')) {
      request = request.clone({
        headers: request.headers.set(
          'lang',
          this._languageService.getCurrnetLang()
        ),
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),

      catchError((errorResponse) => {
        return this._handleErrorService.logError(errorResponse);
      })
    );
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    for (let address of this.urlsToNotUse) {
      if (new RegExp(address).test(requestUrl)) {
        return true;
      }
    }
    return false;
  }
}
