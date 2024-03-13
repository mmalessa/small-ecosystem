import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthService {
  private tokenKey: string = 'security-token';

  constructor(
    private httpClient: HttpClient
  ) {
    // localStorage.setItem(this.tokenKey, '');
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }
  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) != '';
  }

  public doLogout(): void {
    localStorage.setItem(this.tokenKey, '');
  }
  public doLogin(username: string, password: string): Observable<any> {
    return this.httpClient
      .post(
        environment.apiBaseUrl + 'security/auth/token',
        {
          username: username,
          password: password
        },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      )
  }

}
