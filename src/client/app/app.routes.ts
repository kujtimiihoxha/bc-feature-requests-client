import {Routes} from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';
import {FeatureRequestsRoutes} from './feature-requests/feature_requests.routes';
import {AuthGuard} from './shared/guard/auth.guard';
import {LoginRoutes} from './login/login.routes';
import {VerifyRoutes} from './verify/verify.routes';
import {RegisterRoutes} from "./register/register.routes";
import {ClientsRoutes} from "./clients/clients.routes";
import {AdminGuard} from "./shared/guard/admin.guard";
import {ProductAreasRoutes} from "./product_areas/product_areas.routes";
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/bc',
    pathMatch: 'full'
  },
  {
    path: 'bc',
    children: [
      ...FeatureRequestsRoutes
    ],
    canActivate: [AuthGuard],
    component: LayoutComponent
  },
  {
    path: 'bc/clients',
    children: [
      ...ClientsRoutes
    ],
    canActivate: [AuthGuard,AdminGuard],
    component: LayoutComponent
  },
  {
    path: 'bc/product-areas',
    children: [
      ...ProductAreasRoutes
    ],
    canActivate: [AuthGuard,AdminGuard],
    component: LayoutComponent
  },
  ...LoginRoutes,
  ...VerifyRoutes,
  ...RegisterRoutes,
];

