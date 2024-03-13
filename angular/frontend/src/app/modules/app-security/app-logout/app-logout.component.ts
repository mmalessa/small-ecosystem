import { Component } from '@angular/core';
import {AuthService} from "../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-logout',
  standalone: true,
  imports: [],
  templateUrl: './app-logout.component.html',
  styleUrl: './app-logout.component.css'
})
export class AppLogoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.doLogout();
    this.router.navigate(['/']);
  }
}
