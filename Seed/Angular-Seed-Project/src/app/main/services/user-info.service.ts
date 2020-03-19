import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppSettingsService } from './../../core';
import { UserInfo } from './../models/user-info.model';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private baseUrl = `${this.appSettings.baseApiUrl}/userInfo`;

  constructor(private appSettings: AppSettingsService,
    private http: HttpClient) { }

    getUserInfo(): Observable<UserInfo> {
      return this.http.get<UserInfo>(this.baseUrl);
    }

    getUserid(): Observable<string> {
      return this.http.get<string>(`${this.baseUrl}/Userid`);
  }
}
