import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: 'Small Ecosystem<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'frontend';
}
