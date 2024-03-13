import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppAuthComponent} from "./app-auth/app-auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppAuthComponent
  ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Small Ecosystem';
}
