import { Injectable } from '@angular/core';
import { AppSettingsService } from './../config/app-settings.service';
import { HttpClient } from '@angular/common/http';
import { LogPublisher } from './models/log-publishers';
import {  LogConsole } from './log-console';
import {  LogLocalStorage } from './log-local-storage';
import {  LogWebApi } from './log-web-api';
import { Observable } from 'rxjs';
import { LogPublisherConfig } from './models/log-publisher-config';

@Injectable()
export class LogPublishersService {

  constructor( private http: HttpClient,
    private appSettings: AppSettingsService) {
  }

  buildPublishers(): LogPublisher[] {
    console.log('logger config requried');
    const publishers: LogPublisher[] = [];
    let logPub: LogPublisher;
    const settings = this.appSettings.loggerConfiguration;
    console.log(settings);
      for (const pub of settings.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case 'console':
            logPub = new LogConsole();
            logPub.name = 'console';
            break;
          case 'localstorage':
            logPub = new LogLocalStorage();
            logPub.name = 'localstorage';
            break;
          case 'webapi':
            logPub = new LogWebApi(this.http);
            logPub.name = 'webapi';
            break;
        }
        // Set location, if any, of the logging
        logPub.location = pub.loggerLocation;
        // Add publisher to array
        publishers.push(logPub);
      }
      return publishers;
    }
}
