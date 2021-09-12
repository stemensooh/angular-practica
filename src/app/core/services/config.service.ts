import { Injectable, APP_INITIALIZER } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthModel } from 'src/app/modules/auth/models/auth.model';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _config?: any
  private _env?: string;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(private _http: HttpClient) {
    // this.load();
  }

  load() {
    console.log('ConfigModule load()');
    return new Promise((resolve, reject) => {
      this._env = 'development';
      if (environment.production)
        this._env = 'production';
      console.log(this._env)
      var url = './assets/config/' + this._env + '.json';
      console.log(url);

      this._http.get(url)
        .subscribe((data) => {
          console.log(data);
          this._config = data;
          resolve(true);
        },
          (error: any) => {
            console.error(error);
            return Observable.throw(error.json().error || 'Server error');
          });
    });
  }
  // Is app in the development mode?
  isDevmode() {
    return this._env === 'development';
  }
  // Gets API route based on the provided key
  getApiEndpoints(key: string): string {
    return this._config["endpoints_api"][key];
  }
  // Gets API route based on the provided key
  getApiEndpointBase(): string {
    return this._config["endpoints_api"]["url_api"];
  }
  // Gets a value of specified property in the configuration file
  get(key: any) {
    return this._config[key];
  }

  getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

export function ConfigFactory(config: ConfigService) {
    return () => config.load();
}

export function init() {
    return {
        provide: APP_INITIALIZER,
        useFactory: ConfigFactory,
        deps: [ConfigService],
        multi: true
    };
}

const ConfigModule = {
    init: init
};

export { ConfigModule };
