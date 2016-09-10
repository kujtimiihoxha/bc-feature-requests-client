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
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Client, ClientService} from '../../shared/index';
/**
 *
 * ClientsResolver.
 * Get the clients from the server.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/9/2016
 **/
@Injectable()
export class ClientsResolver implements Resolve<Client[]> {

  /**
   * Constructor that injects the client service.
   * @param clientService used to get the clients.
   */
  constructor(private clientService: ClientService) {  }

  resolve(route: ActivatedRouteSnapshot): Observable<Client[]> {
    return this.clientService.get();
  }
}
