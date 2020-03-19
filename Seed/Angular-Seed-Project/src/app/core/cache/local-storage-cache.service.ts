import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCacheService {

  constructor(private localStorage: LocalStorage) { }

  setItem(key: string, value: any): Observable<boolean> {
    return this.localStorage.setItem(key, value);
  }

  getItem(key: string): Observable<any> {
    return this.localStorage.getItem(key);
  }
}


