import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.css'
})
export class AppLoginComponent {

  protected username: string = '';
  protected password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      router.navigate(['/']);
    }
  }

  public bttLoginClicked(): void {
    this.authService
      .doLogin(this.username, this.password)
      .subscribe({
        next: (response) => this.authService.setToken(response.token),
        error: (err) => console.error(err),
        complete: () => this.onComplete()
      })
    ;
  }

  private onComplete(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
