/**
 * Copyright [2016] [Kujtim Hoxha]
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Routes} from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';
import {FeatureRequestsRoutes} from './feature-requests/feature_requests.routes';
import {AuthGuard} from './shared/guard/auth.guard';
import {LoginRoutes} from './login/login.routes';
import {VerifyRoutes} from './verify/verify.routes';
import {RegisterRoutes} from './register/register.routes';
import {ClientsRoutes} from './clients/clients.routes';
import {ProductAreasRoutes} from './product_areas/product_areas.routes';
/**
 * Main application routes.
 *     => /bc
 *  bc => /bc list feature requests.
 *  bc/clients => /bc/clients list clients.
 *  bc/product-areas => /bc/product-areas list product areas.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
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
    canActivate: [AuthGuard],
    component: LayoutComponent
  },
  {
    path: 'bc/product-areas',
    children: [
      ...ProductAreasRoutes
    ],
    canActivate: [AuthGuard],
    component: LayoutComponent
  },
  ...LoginRoutes,
  ...VerifyRoutes,
  ...RegisterRoutes,
];

