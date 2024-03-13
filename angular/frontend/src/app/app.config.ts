import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {AuthService} from "./services/auth-service";
import {HttpClient, HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {ApiClientService} from "./app-api-client/api-client.service";
import {authInterceptor} from "./interceptors/auth-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthService,
    ApiClientService,
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([
      authInterceptor
    ])),
  ]
};
