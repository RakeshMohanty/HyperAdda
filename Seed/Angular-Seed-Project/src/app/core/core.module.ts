import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor/http-interceptor.service';
import { APP_INITIALIZER } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoggerService } from './logger/logger.service';
import { ConfigService } from './config/config.service';
import { SpinnerService } from './spinner/spinner.service';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { AppSettingsService } from './config/app-settings.service';
import { LoaderService } from './service-loader/loader.service';
import { LogPublishersService } from './logger/log-publishers.service';


export function load_config(configService: ConfigService) {
  return () => configService.getSettings();
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({ loader: {
                              provide: TranslateLoader,
                              useFactory: HttpLoaderFactory,
                              deps: [HttpClient] }})
  ],
  declarations : [],
  providers:    [ SpinnerService, LoaderService,
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    ConfigService , AppSettingsService,
    { provide: APP_INITIALIZER, useFactory: load_config, deps: [ConfigService], multi: true },
    LoggerService, LogPublishersService
  ]
})


export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
  if (parentModule) {
    throw new Error(
      'CoreModule is already loaded. Import it in the AppModule only');
  }
}

}
