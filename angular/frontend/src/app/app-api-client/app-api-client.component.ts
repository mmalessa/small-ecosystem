import { Component } from '@angular/core';
import {ApiClientService} from "./api-client.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-api-client',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './app-api-client.component.html',
})
export class AppApiClientComponent {
  public response: string = '';
  public url: string = '';

  constructor(
    private apiClientService: ApiClientService
  ) {
  }

  public onButtonGetClicked(): void {
    if (this.url == '') {
      return;
    }
    this.response = '';
    this.apiClientService
      .get(this.url)
      .subscribe({
        next: (response) => this.handleResponse(response),
        error: (err) => console.error(err),
      })
  }

  private handleResponse(response: any): void {
    this.response = response
  }
}
