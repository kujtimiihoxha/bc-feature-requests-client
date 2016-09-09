import {Route} from '@angular/router';
import {VerifyComponent} from './index';
// import {LoginGuard} from '../shared/guard/login.guard';

export const VerifyRoutes: Route[] = [
  {
    path: 'verify/:id',
    component: VerifyComponent,
  }
];
