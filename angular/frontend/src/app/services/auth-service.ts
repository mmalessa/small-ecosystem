import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {JwtTokenInfo} from "../app.interfaces";

@Injectable()
export class AuthService {
  private tokenKey: string = 'security-token';
  private tokenInfoEmpty: JwtTokenInfo = {
    authorities: [],
    username: '',
    firstName: '',
    lastName: '',
    exp: 0
  }
  private tokenInfo: JwtTokenInfo = this.tokenInfoEmpty;

  constructor(
    private httpClient: HttpClient
  ) {
    this.initTokenInfo();
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }

  public getTokenInfo(): JwtTokenInfo {
    return this.tokenInfo;
  }

  public setToken(token: any): void {
    if (token == undefined) {
      this.resetToken();
      console.error("setToken - token is undefined!");
      return;
    }

    localStorage.setItem(this.tokenKey, token);
    this.initTokenInfo();
  }

  private resetToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.initTokenInfo();
  }

  private initTokenInfo(): void {
    const token: string = this.getToken();
    if (token == '') {
      this.tokenInfo = this.tokenInfoEmpty;
      return;
    }
    const tokenInfoRaw: string[] = token.split('.');
    this.tokenInfo = JSON.parse(atob(tokenInfoRaw[1]));
  }

  public isLoggedIn(): boolean {
    return this.getToken() != '';
  }

  public doLogout(): void {
    this.resetToken();
  }

  public askForToken(username: string, password: string): Observable<any> {
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
