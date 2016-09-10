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
  ClientsComponent,
  ClientsResolver,
  NewClientComponent
} from './index';
import {AdminGuard} from '../shared/index';
/**
 * ClientsRoutes.
 * The declared client routes
 * Routes:
 *   => /bc/clients list of clients.
 *  new => /bc/clients/new create new client.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/9/2016
 **/
export const ClientsRoutes: Route[] = [
  {
    path: '',
    component: ClientsComponent,
    resolve: {
      clients: ClientsResolver
    },
  },
  {
    path: 'new',
    component: NewClientComponent,
    canActivate:[AdminGuard]
  }
];
