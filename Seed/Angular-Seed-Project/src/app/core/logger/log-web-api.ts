import { RequestOptions } from '@angular/http';
import { LogPublisher } from './models/log-publishers';
import { HttpClient } from '@angular/common/http';
import { LogEntry } from './models/log-entry.model';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

export class LogWebApi extends LogPublisher {
  constructor(private http: HttpClient) {
    super();

    this.location = 'http://localhost:56590/api/log';
  }

  log(record: LogEntry): Observable<boolean | {}> {
      return this.http.post<boolean>(this.location, record)
               .pipe (
                tap((response) => { console.log(`Result returned by web api logger: ${response}`); }),
                catchError((error, operation) => {
                        console.log( `Error thrown by web api logger: ${error}`);
                        return of(true); })
               );
  }

  get(): Observable<LogEntry[]> {
    return this.http.get<LogEntry[]>(this.location);
  }

  clear(): Observable<boolean> {
    return this.http.delete<boolean>(this.location);
  }
}
