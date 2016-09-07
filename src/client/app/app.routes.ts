import {Routes} from "@angular/router";
import {LayoutComponent} from "./shared/layout/layout.component";
import {FeatureRequestsRoutes} from "./feature-requests/feature_requests.routes";
import {AuthGuard} from "./shared/guard/auth.guard";
import {LoginRoutes} from "./login/login.routes";
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
  ...LoginRoutes
];

