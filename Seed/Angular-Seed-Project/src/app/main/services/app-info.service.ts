import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsService } from './../../core';
import { AppInfo } from './../models/app-info.model';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {
  private baseUrl = `${this.appSettings.baseApiUrl}/appInfo/`;

  constructor(private appSettings: AppSettingsService,
    private http: HttpClient) { }

    getAppInfo(): Observable<AppInfo> {
      return this.http.get<AppInfo>(this.baseUrl);
    }
}
