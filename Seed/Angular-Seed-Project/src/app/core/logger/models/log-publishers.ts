import { LogEntry } from './log-entry.model';
import { Observable } from 'rxjs';

export abstract class LogPublisher {
  location: string;
  name: string;
  abstract log(record: LogEntry): Observable<boolean | {}>;
  abstract clear(): Observable<boolean>;
}
