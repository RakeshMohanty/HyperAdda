import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const CONFIGURATION_FILE = 'config.json';

@Injectable()
export class ConfigService {
  private config: Object = null;

  constructor(private http: HttpClient) {}

  public getConfig(key: any) {
    return this.config[key];
 }

getSettings(): Promise<any> {
  const promise = this.http.get(CONFIGURATION_FILE)
    .toPromise()
    .then(settings => { this.config = settings;
                        return settings;
                      });
  return promise;
}
}
