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
import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import {
  Client,
  ClientService,
  BreadcrumbService,
  LoadingService,
} from '../shared/index';
declare const Materialize: any;

/**
 * ClientsComponent.
 * Used to display the table  of clients
 *
 * Route: /bc/clients
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/9/2016
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-clients',
  templateUrl: 'clients.component.html',
  styleUrls: ['clients.component.css'],
})
export class ClientsComponent implements OnInit {
  /**
   * Table data, clients received from the server.
   */
  clients: Client[];

  /**
   * Current client selected.
   * Used from edit,delete modal.
   */
  currentClient: Client;

  /**
   * User role.
   */
  role:number;

  /**
   * Event emitter used to show,hide edit modal
   */
  editModal: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Event emitter used to show,hide delete modal
   */
  deleteModal: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Constructor that injects necessary injectable classes.
   * Gets the user role.
   *
   * @param breadcrumb used to update the breadcrumb of the header.
   * @param loading used to display loading during transaction.
   * @param clientService used to send edited,deleted client to the server.
   * @param route used to get the data from the resolver.
   */
  constructor(private breadcrumb: BreadcrumbService,
              private loading: LoadingService,
              private clientService: ClientService,
              private route: ActivatedRoute) {
    this.role = new JwtHelper().decodeToken(localStorage.getItem('id_token')).role;
  }

  /**
   * Initiates the table data, updates breadcrumb.
   */
  ngOnInit(): void {
    this.breadcrumb.items = ['Clients'];
    this.clients = this.route.snapshot.data['clients'];
  }

  /**
   * Open edit modal.
   * Set the current client based on the id received,
   *  emit the openModal event.
   * @param id current client id.
   */
  openEditModal(id: string) {
    for (var i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === id) {
        this.currentClient = new Client();
        this.currentClient.id = this.clients[i].id;
        this.currentClient.name = this.clients[i].name;
        this.currentClient.description = this.clients[i].description;
        break;
      }
    }
    this.editModal.emit('openModal');
  }

  /**
   * Open delete modal.
   * Set the current client based on the id received,
   *  emit the openModal event.
   * @param id current client id
   */
  openDeleteModal(id: string) {
    for (var i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === id) {
        this.currentClient = new Client();
        this.currentClient.id = this.clients[i].id;
        this.currentClient.name = this.clients[i].name;
        this.currentClient.description = this.clients[i].description;
        break;
      }
    }
    this.deleteModal.emit('openModal');
  }

  /**
   * Close delete modal without any change.
   */
  closeDeleteModal() {
    this.deleteModal.emit('closeModal');
  }

  /**
   * Close edit modal without any change.
   */
  closeEditModal() {
    this.editModal.emit('closeModal');
  }

  /**
   * Sends the deleted client id to the server.
   * Success:
   *      Remove client from table.
   *      Close modal.
   * Error:
   *      Display error message.
   *      Close modal.
   */
  confirmDeleteClient() {
    this.loading.on();
    this.clientService.delete(this.currentClient.id).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      this.deleteModal.emit('closeModal');
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe(()=> {
      for (var i = 0; i < this.clients.length; i++) {
        var clientToDelete = new Client();
        if (this.clients[i].id === this.currentClient.id) {
          clientToDelete = this.clients[i];
          break;
        }
      }
      this.clients.splice(this.clients.indexOf(clientToDelete), 1);
      this.deleteModal.emit('closeModal');
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast('Delete Successful', 2000);
    });
  }

  /**
   * Sends the edited client to the server.
   * Success:
   *      Update client in table.
   *      Close modal.
   * Error:
   *      Display error message.
   *      Close modal.
   */
  editClient() {
    this.loading.on();
    this.clientService.put(this.currentClient.id, this.currentClient).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      this.editModal.emit('closeModal');
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe((response: Client)=> {
      for (var i = 0; i < this.clients.length; i++) {
        if (this.clients[i].id === this.currentClient.id) {
          this.clients[i].name = response.name;
          this.clients[i].description = response.description;
          this.currentClient = null;
          break;
        }
      }
      this.editModal.emit('closeModal');
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast('Update Successful', 2000);
    });
  }
}
