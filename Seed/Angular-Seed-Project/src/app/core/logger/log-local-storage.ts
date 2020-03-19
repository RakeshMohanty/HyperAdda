import { LogPublisher } from './models/log-publishers';
import { Observable, of } from 'rxjs';
import { LogEntry } from './models/log-entry.model';

export class LogLocalStorage extends LogPublisher {
  constructor() {
    super();
    this.location = 'logging';
  }

  getAll(): Observable<LogEntry[]> {
    let values: LogEntry[];

    // Retrieve all values from local storage
    values = JSON.parse(localStorage.getItem(this.location)) || [];

    return of(values);
  }

  log(record: LogEntry): Observable<boolean> {
    let ret = false;
    let values: LogEntry[];
    try {
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      // Add new log entry to the array
      values.push(record);
      // Store the complete array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));
      ret = true;
    } catch (ex) {
      console.log(ex);
    }
    return of(ret);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}
