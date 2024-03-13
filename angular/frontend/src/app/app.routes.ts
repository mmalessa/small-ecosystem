import { Routes } from '@angular/router';
import {AppLoginComponent} from "./modules/app-security/app-login/app-login.component";
import {canActivate} from "./modules/app-security/classes/app-security-guard";
import {AppLogoutComponent} from "./modules/app-security/app-logout/app-logout.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivateChild: [canActivate],
    children: [
      {
        path: 'pages',
        // canActivate: [canActivate],
        loadChildren: () =>
          import('./modules/app-pages/app-pages.module').then((m) => m.AppPagesModule)
      }
    ]
  },
  {
    path: 'login',
    component: AppLoginComponent,
  },
  {
    path: 'logout',
    component: AppLogoutComponent,
  }
];
