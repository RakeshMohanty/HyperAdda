
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { LoggerService } from './../logger/logger.service';
import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService {

  constructor(private logger: LoggerService) { }


  handleError(httpError: any): Observable<HttpEvent<any>> {
    let errorMessage = `An error occurred:' ${httpError.status} - ${
      httpError.statusText
    }`;
    if (httpError.error) {
      if (httpError.error.ExceptionMessage) {
        errorMessage = `${errorMessage} - ${httpError.error.ExceptionMessage}`;
      } else {
        this.logger.error(httpError);
        console.log(httpError);
        return observableThrowError(httpError);
      }
    }
    this.logger.error(errorMessage);
    console.log(errorMessage);
    return observableThrowError(errorMessage);
  }
}
