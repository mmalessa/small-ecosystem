import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../services/auth-service";

@Component({
  selector: 'app-auth',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './app-auth.component.html',
})
export class AppAuthComponent {
  protected username: string = '';
  protected password: string = '';
  protected isloggedin: boolean = false;
  protected errorMsg: string = '';

  constructor(
    private authService: AuthService
  ) {
    this.isloggedin = this.authService.isLoggedIn();
  }
  public bttLoginClicked(): void {
    this.errorMsg = '';
    this.authService
      .doLogin(this.username, this.password)
      .subscribe({
        next: (response) => this.authService.setToken(response.token),
        error: (err) => this.handleError(err),
        complete: () => this.onComplete()
      })
    ;
  }

  public bttLogoutClicked(): void {
    this.authService.doLogout();
    this.onComplete();
  }

  private handleError(err: any): void {
    this.errorMsg = err.statusText ?? "Unknown error";
  }

  private onComplete(): void {
    this.isloggedin = this.authService.isLoggedIn();
  }
}
