import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {
  private tokenKey: string = 'security-token';

  constructor() {
    localStorage.setItem(this.tokenKey, '');
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
}
