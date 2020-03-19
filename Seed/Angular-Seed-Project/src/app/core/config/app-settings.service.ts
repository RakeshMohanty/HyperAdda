import { Inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';


@Injectable()
export class AppSettingsService {
  constructor(private config: ConfigService) {}

  get baseApiUrl() {
   return this.config.getConfig('applicationServiceUrl');
 }
 get environmentName() {
  return this.config.getConfig('environmentName');
}
get version() {
  return this.config.getConfig('version');
}

get loggerConfiguration() {
  return this.config.getConfig('logger-config');
}

localeUrl(localeCode: string) {
  const key = `i18n-${localeCode.toLocaleLowerCase()}`;
  return this.config.getConfig(key);
}

}
