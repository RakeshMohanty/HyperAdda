import { Component, OnInit } from '@angular/core';
import { MatDialog , MatDialogRef} from '@angular/material';
import {  SpinnerService,
          AppSettingsService,
          LocalStorageCacheService } from './core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  showSpinner = false;
  subscription: Subscription;
  constructor(
    private spinnerService: SpinnerService,
    private appSettings: AppSettingsService,
    private dialog: MatDialog,
    private localCache: LocalStorageCacheService) {}

  ngOnInit() {
    this.setLocale();
    this.subscription = this.spinnerService.getMessage()
    .subscribe(show => this.displaySpinner(show));
  }

  private setLocale() {
    let requestedUrl = window.location.href;
    console.log(requestedUrl);
    requestedUrl = requestedUrl.slice(0, requestedUrl.lastIndexOf('/'));
    const urlLocale = requestedUrl.split('/').pop();
    console.log(requestedUrl);
    console.log(urlLocale);
    if (urlLocale.length === 2 && this.appSettings.localeUrl(urlLocale)) {
      console.log(this.appSettings.localeUrl(urlLocale));
      const  language = { Name: urlLocale, Icon: `${urlLocale}.png` };
      this.localCache.setItem('current-language', language).subscribe(() => {});
    }
  }

  private displaySpinner(show: boolean) {
    this.showSpinner = show;
  }
}
