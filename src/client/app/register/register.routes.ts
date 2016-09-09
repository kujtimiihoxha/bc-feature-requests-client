import {Route} from '@angular/router';
import {RegisterComponent} from './index';
// import {LoginGuard} from '../shared/guard/login.guard';

export const RegisterRoutes: Route[] = [
  {
    path: 'register',
    component: RegisterComponent,
  }
];
