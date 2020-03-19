import { ConfigService } from './../config/config.service';
import { AppSettingsService } from './../config/app-settings.service';
import { LogPublishersService } from './../logger/log-publishers.service';
import { TestBed, inject } from '@angular/core/testing';
import { LoggerService } from './../logger/logger.service';
import { ErrorHandlerService } from './error-handler.service';
import {
  HttpClient, HttpHandler
} from '@angular/common/http';

describe('ErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerService, LoggerService,
        LogPublishersService, HttpClient, HttpHandler,
        AppSettingsService, ConfigService]
    });
  });

  it('should be created', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
