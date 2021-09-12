import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { AuthModel } from '../../models/auth.model';
import { ConfigService } from 'src/app/core/services/config.service';

// const API_USERS_URL = `${environment.apiUrl}/usuario`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  private strUrlBase: string = '';

  constructor(
    private http: HttpClient, 
    private configService: ConfigService 
    ) {
    this.strUrlBase = this.configService.getApiEndpointBase();// + '/usuario';
    console.log(this.strUrlBase);
  }

  // public methods
  login(email: string, password: string, identificacion: string): Observable<any> {
    return this.http.post<AuthModel>(`${this.strUrlBase}/usuario/login`, {
      'Username': email,
      'Password': password,
      'Identificacion': identificacion
    });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.strUrlBase, user);
    // return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.strUrlBase}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${this.strUrlBase}/usuario`, {
      headers: httpHeaders,
    });
  }
}
