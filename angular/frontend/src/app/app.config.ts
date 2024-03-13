import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {AuthService} from "./modules/app-security/services/auth-service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthService
  ]
};
