import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  echoResponse: any = null;
  echoError: string | null = null;
  echoLoading = false;

  demoResponse: string | null = null;
  demoError: string | null = null;
  demoLoading = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  pingEcho(): void {
    this.echoLoading = true;
    this.echoError = null;
    this.apiService.pingEcho().subscribe({
      next: (res) => {
        this.echoResponse = res;
        this.echoLoading = false;
      },
      error: (err) => {
        this.echoError = err.message || 'Request failed';
        this.echoLoading = false;
      },
    });
  }

  pingDemo(): void {
    this.demoLoading = true;
    this.demoError = null;
    this.apiService.pingDemo().subscribe({
      next: (res) => {
        this.demoResponse = res;
        this.demoLoading = false;
      },
      error: (err) => {
        this.demoError = err.message || 'Request failed';
        this.demoLoading = false;
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
