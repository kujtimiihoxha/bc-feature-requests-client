import {Route} from '@angular/router';
import {LoginComponent} from './index';
import {LoginGuard} from '../shared/guard/login.guard';

export const LoginRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  }
];
