import { Injectable } from '@angular/core';
import { LogPublishersService } from '../logger/log-publishers.service';
import { LogLevel } from './models/log-level.enum';
import { LogPublisher } from './models/log-publishers';
import { LogEntry } from './models/log-entry.model';
import { Observable } from 'rxjs';
import { LogLocalStorage } from './log-local-storage';
import { LogWebApi } from './log-web-api';

@Injectable()
export class LoggerService {

   // Public properties
   private level: LogLevel = LogLevel.All;
   private logWithDate = true;
   private publishers: LogPublisher[];

   isConsole = true;
   isWebApi = true;
   isLocalStorage = true;

    constructor(private publisher: LogPublishersService) {}

    debug(msg: string, ...optionalParams: any[]) {
      this.writeToLog(msg, LogLevel.Debug, optionalParams);
    }

    info(msg: string, ...optionalParams: any[]) {
      this.writeToLog(msg, LogLevel.Info, optionalParams);
    }

    warn(msg: string, ...optionalParams: any[]) {
      this.writeToLog(msg, LogLevel.Warn, optionalParams);
    }

    error(msg: string, ...optionalParams: any[]) {
      this.writeToLog(msg, LogLevel.Error, optionalParams);
    }

    fatal(msg: string, ...optionalParams: any[]) {
      this.writeToLog(msg, LogLevel.Fatal, optionalParams);
    }

    log(msg: any, ...optionalParams: any[]) {
      this.writeToLog(msg, LogLevel.All, optionalParams);
    }

    readLog(source: string): Observable<LogEntry[]> {
      this.populatePublishers();
      if (source === 'localstorage') {
        const tmp = this.publishers.find(p => p.name === 'localstorage');
        if (tmp != null) {
          const local = tmp as LogLocalStorage;
          return local.getAll();
        }
      }
      if (source === 'webapi') {
        const tmp = this.publishers.find(p => p.name === 'webapi');
        if (tmp != null) {
          const local = tmp as LogWebApi;
          return local.get();
        }
      }
    }

    clearLog(source: string): Observable<boolean> {
      this.populatePublishers();
      if (source === 'localstorage') {
        const tmp = this.publishers.find(p => p.name === 'localstorage');
        if (tmp != null) {
          const local = tmp as LogLocalStorage;
          return local.clear();
        }
      }
      if (source === 'webapi') {
        const tmp = this.publishers.find(p => p.name === 'webapi');
        if (tmp != null) {
          const local = tmp as LogWebApi;
          return local.clear();
        }
      }
    }

    private shouldLog(level: LogLevel): boolean {
      let ret = false;

      if (this.level !== LogLevel.Off && level >= this.level) {
        ret = true;
      }

      return ret;
    }
    private populatePublishers() {
      if (this.publishers === undefined) {
        this.publishers = this.publisher.buildPublishers();
      }
    }
    private writeToLog(msg: string, level: LogLevel, params: any[]) {
      if (this.shouldLog(level)) {
        this.populatePublishers();
        const entry: LogEntry = new LogEntry();
        entry.message = msg;
        entry.level = level;
        entry.extraInfo = params;
        entry.logWithDate = this.logWithDate;

        // Log the value to all publishers
        for (const logger of this.publishers) {
          if (logger.name === 'console' && this.isConsole) {
            logger.log(entry).subscribe(response => console.log(response));
          }
          if (logger.name === 'localstorage' && this.isLocalStorage) {
            logger.log(entry).subscribe(response => console.log(response));
          }
          if (logger.name === 'webapi' && this.isWebApi) {
            logger.log(entry).subscribe(response => console.log(response));
          }
        }
      }
    }
}
