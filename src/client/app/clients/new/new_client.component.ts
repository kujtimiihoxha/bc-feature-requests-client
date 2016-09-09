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
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {
  Client,
  LoadingService,
  ClientService,
  BreadcrumbService
} from '../../shared/index';
declare const Materialize: any;
/**
 * NewClientComponent.
 * Used to add new components.
 *
 * Route: /bc/clients/new
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/9/2016
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-new-client',
  templateUrl: 'new_client.component.html',
  styleUrls: ['new_client.component.css'],
})
export class NewClientComponent implements OnInit {
  /**
   * The new client that will be sent to the server.
   */
  client: Client;

  /**
   * Constructor that injects necessary injectable classes.
   *
   * @param router used to navigate to clients list after successful insert.
   * @param breadcrumb used to update the breadcrumb of the header.
   * @param loading used to display loading during transaction.
   * @param clientService used to insert the client.
   */
  constructor(private router: Router,
              private breadcrumb: BreadcrumbService,
              private loading: LoadingService,
              private clientService: ClientService) {
  }

  /**
   * Initiates client, updates breadcrumb.
   */
  ngOnInit(): void {
    this.breadcrumb.items = ['Clients', 'Create'];
    this.client = new Client()
  }

  /**
   * Submit the new client to the server.
   */
  submit() {
    this.loading.on();
    this.clientService.post(this.client).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe(()=> {
      this.loading.off();
      this.router.navigate(['/bc/clients']);
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast('Create Successful', 2000);
    });
  }

}
