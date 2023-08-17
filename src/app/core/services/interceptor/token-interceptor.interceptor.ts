import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HTTP_INTERCEPTORS,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthEndpoints } from 'src/app/shared/services/endpoints/auth.endpoint.service';
import { map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private _authEndpoints:AuthEndpoints,private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    debugger
    if (!request.headers.has('Authorization')) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this._authEndpoints.token}`),
      });
    }

  return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
  
            if(event.status == 401) {
              this.toastr.error("",  'Session has been expired  ', {
                timeOut: 10000,
                progressBar: true,
                tapToDismiss :true,
                positionClass :"toast-top-center"
              });
            }
            if(event.status == 400) {
              this.toastr.error("",  'Something wrong happened please contact with sysadmin ', {
                timeOut: 10000,
                progressBar: true,
                tapToDismiss :true,
                positionClass :"toast-top-center"
              });
            }
          }
          return event;
        },
        error: (error) => {
  
          if(error.status == 401) {
            this.toastr.error("",  'Session has been expired  ', {
              timeOut: 10000,
              progressBar: true,
              tapToDismiss :true,
              positionClass :"toast-top-center"
            });
            this._authEndpoints.logout();
          }
          if(error.status == 400) {
  
            this.toastr.error("",  'Something wrong happened please contact with sysadmin ', {
              timeOut: 10000,
              progressBar: true,
              tapToDismiss :true,
              positionClass :"toast-top-center"
            });
          }
          if(error.status == 404) {
            this.toastr.error("",  'Something wrong happened please contact with sysadmin ', {
              timeOut: 10000,
              progressBar: true,
              tapToDismiss :true,
              positionClass :"toast-top-center"
            });
          }
          if(error.status == 403) {
            this.toastr.error("",  'Something wrong happened please contact with sysadmin ', {
              timeOut: 10000,
              progressBar: true,
              tapToDismiss :true,
              positionClass :"toast-top-center"
            });
          this._authEndpoints.logout();
          }
        }
  
      }
      )
    );
  
  
  }

}
 
 
  