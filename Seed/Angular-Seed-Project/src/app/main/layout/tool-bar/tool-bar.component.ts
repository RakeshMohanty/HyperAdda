import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar
} from '@angular/material';
import {
  SpinnerService,
  AppSettingsService,
  LocalStorageCacheService,
  MemoryCacheService
} from './../../../core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserInfoService } from './../../services/user-info.service';
import { AppInfoService } from './../../services/app-info.service';
import { AppInfo, Language } from './../../models/app-info.model';
import { UserInfo } from './../../models/user-info.model';


@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  @Input() dispalyToggleButton = false;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();
  selectedLanguage = { Name: 'en', Icon: 'en.png' };
  appInfo: AppInfo;
  user: UserInfo;
  Userid: string;
  showLogo = true;
  errorMessage: string;
  constructor(
    public translate: TranslateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private spinner: SpinnerService,
    private appSettings: AppSettingsService,
    private userInfo: UserInfoService,
    private appInfoService: AppInfoService,
    private localCache: LocalStorageCacheService,
    private memoryCache: MemoryCacheService
  ) {}

  ngOnInit() {
    this.getUserid();
  }

  onLanguageMenuClick(language: Language) {
    this.selectedLanguage = language;
    const localeUrl = this.appSettings.localeUrl(language.Name);
    this.translate.use(language.Name.toLowerCase());
    this.localCache.setItem('current-language', language).subscribe(() => {});
    this.spinner.show(true);
    window.location.href = localeUrl;
  }
  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  hideLogo(show: boolean) {
    this.showLogo = show;
  }
  private setTranlations() {
    const langs = [];
    this.appInfo.Languages.forEach(x => {
      langs.push(x.Name.toLowerCase());
    });
    this.translate.addLangs(langs);
    this.translate.setDefaultLang('en');
    this.localCache.getItem('current-language').subscribe(data => {
      if (data != null) {
        this.selectedLanguage = data;
        this.translate.use(data.Name.toLowerCase());
      } else {
        this.translate.use('en');
      }
    });
  }

  private getUserid() {
    // this.userInfo.getUserid().subscribe(data => {
    //   this.Userid = data;
    //   this.memoryCache.setItem('user_Userid', data);
    //   this.getApplicationInfo();
    // },
    // error => {
    //   console.log(error);
    //   this.errorMessage = ` :->  Error code: ${error.status} - ${
    //     error.statusText
    //   }`;
    // });

    this.fetch((data) => {
      this.Userid = data;
      this.memoryCache.setItem('user_Userid', data);
      this.getApplicationInfo();
    }, 'user-Userid');
  }

  private getUserInfo() {
    // this.userInfo.getUserInfo().subscribe(data => {
    //   this.user = data;
    // });
    this.fetch((data) => {
      this.user = data;
    }, 'user-info');
  }

  private getApplicationInfo() {
    // this.appInfoService.getAppInfo().subscribe(
    //   data => {
    //     this.appInfo = data;
    //     this.setTranlations();
    //     this.getUserInfo();
    // });
    this.fetch((data) => {
      this.appInfo = data;
      this.setTranlations();
      this.getUserInfo();
    }, 'app-info');
  }

  fetch(mockData, file) {
    const req = new XMLHttpRequest();
    const path = `assets/data/${ file }.json`;
    req.open('GET', path);
    req.onload = () => {
      mockData(JSON.parse(req.response));
    };
    req.send();
  }
}
