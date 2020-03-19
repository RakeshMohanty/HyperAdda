import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { SpinnerService } from './../spinner/spinner.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
  HttpHandler,
  HttpResponse
} from '@angular/common/http';

import { catchError, finalize, map } from 'rxjs/operators';



@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(public errorHandler: ErrorHandlerService,
  private spinner: SpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.spinner.show(true);
    const headers = new HttpHeaders()
      .set('Accept-Language', 'en')
      .set('Content-Type', 'application/json');
    request = request.clone({ headers: headers, withCredentials: true });
    return next.handle(request)
      .pipe( map(event => {
          return event;
      }),
      catchError(error => {
          return this.errorHandler.handleError(error);
      }),
      finalize(() => {
        // this.spinner.show(false);
      })
  );
}
}
