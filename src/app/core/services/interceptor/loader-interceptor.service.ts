import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0); 
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    // let chunk = 100 / this.requests.length;
    return Observable.create((observer: any) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          // this.loaderService.progressIndicators.next(chunk === 100 ? 80 : chunk);
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        (err) => { 
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          // this.loaderService.progressIndicators.next(100);
          observer.complete();
        }
        );
        // remove request from queue when cancelled
        return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
