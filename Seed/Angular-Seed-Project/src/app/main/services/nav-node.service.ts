import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppSettingsService } from './../../core';
import { NavNode } from './../models/nav-node.model';

@Injectable({
  providedIn: 'root'
})
export class NavNodeService {

  private baseUrl = `${this.appSettings.baseApiUrl}/NavNodes/`;

  constructor(private appSettings: AppSettingsService,
    private http: HttpClient) { }

    getNavNodes(): Observable<NavNode[]> {
      return this.http.get<NavNode[]>(this.baseUrl).pipe (
        catchError((error, operation) => of([]))
      );

    }
}
