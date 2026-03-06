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
  loading = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  pingEcho(): void {
    this.loading = true;
    this.echoError = null;
    this.apiService.pingEcho().subscribe({
      next: (res) => {
        this.echoResponse = res;
        this.loading = false;
      },
      error: (err) => {
        this.echoError = err.message || 'Request failed';
        this.loading = false;
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
