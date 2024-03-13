import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppAuthComponent} from "./app-auth/app-auth.component";
import {AppApiClientComponent} from "./app-api-client/app-api-client.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppAuthComponent,
    AppApiClientComponent
  ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Small Ecosystem';
}
