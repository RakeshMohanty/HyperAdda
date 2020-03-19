import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class SpinnerService {
  private subject = new Subject<boolean>();

  constructor() {}

  show (show: boolean) {
    this.subject.next(show);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
