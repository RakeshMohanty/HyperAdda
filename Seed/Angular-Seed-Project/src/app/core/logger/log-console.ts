import { LogEntry } from './models/log-entry.model';
import { Observable, of  } from 'rxjs';
import { LogPublisher } from './models/log-publishers';


export class LogConsole extends LogPublisher {
  constructor() {
    super();
    this.location = 'console';
  }
  log(record: LogEntry): Observable<boolean> {
    // Log to the console
    console.log(record.buildLogString());
    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}
