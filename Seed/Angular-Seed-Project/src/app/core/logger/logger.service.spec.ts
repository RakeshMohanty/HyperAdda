import { TestBed, inject } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { LogPublishersService } from './../logger/log-publishers.service';
import { ConfigService } from './../config/config.service';
import { AppSettingsService } from './../config/app-settings.service';
import {
  HttpClient, HttpHandler
} from '@angular/common/http';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService, LogPublishersService,
        HttpClient, HttpHandler,
        ConfigService, AppSettingsService ]
    });
  });

  it('should be created', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));
});
