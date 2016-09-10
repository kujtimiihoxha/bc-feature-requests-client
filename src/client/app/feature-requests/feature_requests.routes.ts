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
import {Route} from '@angular/router';
import {
  FeatureRequestsComponent,
  NewFeatureRequestComponent,
  FeatureRequestDetailsComponent,
  FeatureRequestResolver,
  ClientsResolver,
  ProductAreasResolver,
  FeatureRequestsResolver,
  UsersResolver
} from './index';

/**
 * FeatureRequestsRoutes.
 * The declared feature requests routes
 * Routes:
 *   => /bc list of feature requests
 *  new => /bc/new create new feature request
 *  details/:id => /bc/details/:id feature request details
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
export const FeatureRequestsRoutes: Route[] = [
  {
    path: '',
    component: FeatureRequestsComponent,
    resolve: {
      users: UsersResolver,
      clients: ClientsResolver,
      featureRequests: FeatureRequestsResolver,
      productAreas: ProductAreasResolver
    }
  },
  {
    path: 'new',
    component: NewFeatureRequestComponent,
    resolve: {
      clients: ClientsResolver,
      productAreas: ProductAreasResolver
    }
  },
  {
    path: 'details/:id',
    component: FeatureRequestDetailsComponent,
    resolve: {
      users: UsersResolver,
      clients: ClientsResolver,
      productAreas: ProductAreasResolver,
      featureRequest: FeatureRequestResolver
    }
  }
];
