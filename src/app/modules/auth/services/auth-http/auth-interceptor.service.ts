import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { MyConfiguration } from 'src/app/core/utilities/my-configuration';
import { ConfigService } from 'src/app/core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  tokenValue: string = '';

  constructor(private configService: ConfigService) {
    
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    // begin
    
    const auth = this.configService.getAuthFromLocalStorage();
    if (!auth || !auth.token) {
      this.tokenValue = '';
    }else{
      this.tokenValue = auth.token;
    }

    if (this.tokenValue !== null) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: 'Bearer ' + this.tokenValue
        }
      });
    }
    return next.handle(request).pipe(timeout(Number(600000)));
  }

}