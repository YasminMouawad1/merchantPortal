import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { OAuthService } from 'angular-oauth2-oidc';
import { throwError } from 'rxjs';
import { ToastService } from '../../components/toast/toast.service';
import { BadRequestModel } from '../../models/bad-request.model';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(
    private _translateService: TranslateService,
    // private _oauthService: OAuthService,
    // private _authService: AuthService,
    private toastService: ToastService
  ) { }
  logError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      // this.toastService.error(` ${errorResponse.message}`);
    } else {
      // this.toastService.error(`${errorResponse.message}`);
    }

    if (errorResponse.status === 401 || errorResponse.status === 403) {
      // if (this._oauthService.hasValidAccessToken()) {
      //   if (errorResponse.error.moreInfo){
      //     this.toastService.error(errorResponse.error.moreInfo);
      //   }
      // } else {
      //   this._authService.navigateToLogin();
      // }
    }

    if (
      errorResponse.status === 400 ||
      errorResponse.status === 409 ||
      errorResponse.status === 404 ||
      errorResponse.status > 500
    ) {
      if (errorResponse.error.moreInfo) {
        this.toastService.error(errorResponse.error.moreInfo);
      }
    }

    if (errorResponse.status === 422) {
      let validationResults: BadRequestModel[] = errorResponse.error
        .moreInfo as BadRequestModel[];

      validationResults.forEach((validationResult) => {
        var id = validationResult.MemberNames[0]
          .replace('[', '_')
          .replace(']', '_')
          .replace('.', '');
        var error = validationResult.ErrorMessage;

        let item = document.getElementById(`${id}Error`);
        if (item && item != undefined) {
          item.textContent = error;
        }
      });
    }

    if (
      errorResponse.status == 500 ||
      (errorResponse.status == 0 && errorResponse.statusText == 'Unknown Error')
    ) {
      this._translateService
        .get('general.exception_message')
        .subscribe((response) => {
          this.toastService.error(response);
        });
    }

    return throwError(errorResponse);
  }
}
