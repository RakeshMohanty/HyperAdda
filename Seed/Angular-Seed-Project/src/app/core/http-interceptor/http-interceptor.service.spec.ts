import { SpinnerService } from './../spinner/spinner.service';
import { AppSettingsService } from './../config/app-settings.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor.service';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { LogPublishersService } from './../logger/log-publishers.service';
import { LoggerService } from './../logger/logger.service';
import { ConfigService } from './../config/config.service';

describe('HttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpInterceptorService, ErrorHandlerService, LoggerService
      , SpinnerService, LogPublishersService, AppSettingsService, ConfigService ],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([HttpInterceptorService], (service: HttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
