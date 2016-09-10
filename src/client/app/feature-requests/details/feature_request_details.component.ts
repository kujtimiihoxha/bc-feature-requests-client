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
import {Component, OnInit, Input, EventEmitter, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {DragulaService} from 'ng2-dragula/src/app/providers/dragula.provider';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {
  FeatureRequest,
  ProductArea,
  BreadcrumbService,
  Client,
  User,
  TimeStampHelper,
  FeatureRequestService,
  LoadingService,
  FeatureRequestUpdateDetails,
  MODIFICATIONS,
  DateHelper,
  DemoHelper
} from '../../shared/index';
declare const Materialize: any, $: any;
/**
 * FeatureRequestDetailsComponent.
 * Used to display the details of one feature request.
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/8/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-feature-request-details',
  templateUrl: 'feature_request_details.component.html',
  styleUrls: ['feature_request_details.component.css'],
})
export class FeatureRequestDetailsComponent implements OnInit, OnDestroy {

  /**
   * The feature request.
   */
  @Input() featureRequest: FeatureRequest;

  /**
   * The feature request used to temporary store the data for update details.
   */
  @Input() featureRequestTmp: FeatureRequestUpdateDetails = new FeatureRequestUpdateDetails();

  /**
   * Client ids to remove from feature request clients list.
   */
  clientsToRemove: string[] = [];

  /**
   * Clients and priorities to add to feature request client list.
   */
  clientsToAdd: {id: string,priority: number}[] = [];

  /**
   * The selected product area.
   * Used by the edit details modal.
   */
  selectedProductArea: string;

  /**
   * Storage of client search value
   */
  _nameSearch: string = '';
  /**
   * Clients list.
   * Contains all the clients.
   * It is used to store clients for filtering,
   *  and other places where clients are needed to be displayed on the table.
   */
  @Input() clients: Client[ ];

  /**
   * Current client used for priority selection.
   */
  currentClient: Client;
  /**
   * New comment data
   */
  comment: string;

  /**
   * Temporary client used for drag and drop list.
   */
  clientsTmp: Array<Client> = null;

  /**
   * List of drag and drop clients that are selected
   */
  clientsSelected: Array<Client> = [];

  /**
   * Users list.
   * Contains all the users.
   * It is used to store users for filtering,
   *  and other places where users are needed to be displayed on the table.
   */
  @Input() users: User[ ];

  /**
   * Event emitter used to open and close the details modal.
   */
  detailsModal: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Event emitter used to open and close the add/remove modal.
   */
  addRemoveClientsModal: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Event emitter used to open and close the add/remove modal.
   */
  priorityModal: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Temporary priority storage.
   */
  selectedPriority: number;

  /**
   * Drag and drop subscription.
   * Store here so we can unsubscribe {@link ngOnDestroy}.
   */
  subscription: any;
  /**
   * ProductArea list.
   * Contains all the product areas.
   * It is used to store product areas for filtering,
   *  and other places where product areas are needed to be displayed on the table.
   */
  @Input() productAreas: ProductArea[ ];

  /**
   * Only for demo purpose.
   */
  demo:DemoHelper = new DemoHelper();

  /**
   * Constructor that injects necessary injectable classes.
   * Subscribes to the dropdown add event.
   * @param dragulaService used for drag and drop component
   * @param breadcrumb used to update header breadcrumb
   * @param route used to get the data from resolvers.
   * @param loading used to display loading during transaction.
   * @param featureRequestService used to send requests to the server.
   */
  constructor(private dragulaService: DragulaService,
              private breadcrumb: BreadcrumbService,
              private route: ActivatedRoute,
              private loading: LoadingService,
              private featureRequestService: FeatureRequestService) {
    this.subscription = dragulaService.dropModel.subscribe((value: any) => {
      let fromContainer = value.splice(3);
      let ToContainer = value.splice(2);
      //noinspection TypeScriptUnresolvedFunction
      if ($(fromContainer).attr('data-container') === 'parent'
        && $(ToContainer).attr('data-container') !== 'parent') {
        this.handleAddClient(value.slice(1));
      } else { //noinspection TypeScriptUnresolvedFunction
        if ($(fromContainer).attr('data-container')
                !== 'parent' && $(ToContainer).attr('data-container') === 'parent') {
                this.handleRemoveClient(value.slice(1));
              }
      }
    });
  }

  /**
   * Find the product area name from the {@link #productAreas} list.
   * Is used because the feature request is stored with the product area id  not the name,
   *  and we need the name to be displayed in the dropdown and/or other places.
   * @param id the id of the product area.
   * @returns {string} the product area name.
   * @throws Error if no product area with given id found.
   */
  getProductAreaName(id: string): string {
    for (var i = 0; i < this.productAreas.length; i++) {
      if (this.productAreas[i].id === id) {
        return this.productAreas[i].name;
      }
    }
    throw `Could not find product area with id: ${id}`;
  }

  /**
   * Find the client name from the {@link #clients} list.
   * Is used because the feature request has an array of clients with client id not the name,
   *  and we need the name to be displayed in the dropdown and/or other places.
   * @param id the id of the client.
   * @returns {string} the client name.
   * @throws Error if no product area with given id found.
   */
  getClientName(id: string) {
    for (var i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === id) {
        return this.clients[i].name;
      }
    }
    throw `Could not find client with id: ${id}`;
  }

  /**
   * Find the employ username from the {@link #users} list.
   * Is used because the feature request is stored with the employ id  not the name,
   *  and we need the name to be displayed in the dropdown and/or other places.
   * @param id the id of the employ.
   * @returns {string} the employ name.
   * @throws Error if no employ with given id found.
   */
  getEmployUsername(id: string) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i].username;
      }
    }
    throw `Could not find client with id: ${id}`;
  }

  /**
   * Initializes the data.
   * Data comes from the resolvers.
   */
  ngOnInit(): void {
    this.featureRequest = this.route.snapshot.data['featureRequest'];
    this.users = this.route.snapshot.data['users'];
    this.productAreas = this.route.snapshot.data['productAreas'];
    this.clients = this.route.snapshot.data['clients'];
    this.breadcrumb.setItems(['Feature Requests', 'Details']);
    this.selectedProductArea = this.featureRequest.product_area_id;
  }

  /**
   * Remove subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Is called when target date is changes.
   * @param date
   */
  onDateChanged(date: Date) {
    this.loading.on();
    this.featureRequestService.updateTargetDate(
      this.featureRequest.id, new TimeStampHelper().ISODateString(date)).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe((updated: FeatureRequest)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast('Target date updated', 2000);
      this.featureRequest.target_date = new TimeStampHelper().ISODateString(date);
      this.featureRequest.modifications = updated.modifications;
    });
  }

  /**
   * Used to display the date in a more user friendly way.
   * @param date the date to be displayed.
   * @returns {string} the date formatted string.
   */
  getDate(date: string) {
    let dt = new Date(date);
    let month = DateHelper.MONTHS[dt.getMonth()];
    let year = dt.getFullYear();
    let dayDate = dt.getDate();
    let day = DateHelper.DAYS[dt.getDay()];
    return `${dt.getHours()}:${dt.getMinutes()} ${day} ${dayDate} ${month} ${year}`;
  }

  /**
   * Opens the details model.
   * Sets up the temporary data.
   */
  openDetailsModal() {
    this.featureRequestTmp = new FeatureRequestUpdateDetails();
    this.featureRequestTmp.modifications = [];
    this.featureRequestTmp.title = this.featureRequest.title;
    this.featureRequestTmp.description = this.featureRequest.description;
    this.featureRequestTmp.ticket_url = this.featureRequest.ticket_url;
    this.detailsModal.emit('openModal');
  }

  /**
   * Sends the request to the server and updates local data on success.
   */
  updateDetails() {
    this.findModifications();
    this.featureRequestTmp.product_area_id = this.selectedProductArea;
    this.loading.on();
    this.featureRequestService.updateDetails(this.featureRequest.id, this.featureRequestTmp).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction,TypeScriptUnresolvedFunction
      Materialize.toast(JSON.parse(error._body).message, 2000);
      this.detailsModal.emit('closeModal');
      return Observable.empty();
    }).subscribe((updated: FeatureRequest)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedFunction
      Materialize.toast('Feature request details updated', 2000);
      this.featureRequest.title = updated.title;
      this.featureRequest.description = updated.description;
      this.featureRequest.ticket_url = updated.ticket_url;
      this.featureRequest.product_area_id = updated.product_area_id;
      this.featureRequest.modifications = updated.modifications;
      this.detailsModal.emit('closeModal');
    });
  }

  /**
   * Closes details model without any change.
   */
  closeEditDetailsModal() {
    this.detailsModal.emit('closeModal');
  }

  /**
   * Toggles feature request state.
   */
  updateState() {
    var state = 1;
    if (this.featureRequest.closed) {
      state = 2;
    }
    this.loading.on();
    this.featureRequestService.updateState(this.featureRequest.id, state).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction,TypeScriptUnresolvedFunction
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe((updated: FeatureRequest)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedFunction
      Materialize.toast('Request state updated', 2000);
      this.featureRequest.closed = updated.closed;
      this.featureRequest.modifications = updated.modifications;
    });
  }

  /**
   * Add or remove clients
   */
  addRemoveClients() {
    this.clientsTmp = [];
    this.clientsSelected = [];
    this.clientsToRemove = [];
    this.clientsToAdd = [];
    this.featureRequest.clients.forEach((client: any)=> {
      for (var i = 0; i < this.clients.length; i++) {
        if (this.clients[i].id === client.client_id) {
          this.clientsSelected.push(this.clients[i]);
          break;
        }
      }
    });
    // automatically filters the client list to default
    this.nameSearch = '';
    //

    this.addRemoveClientsModal.emit('openModal');
  }

  /**
   * Add or remove clients
   */
  closeAddRemoveModal() {
    this.addRemoveClientsModal.emit('closeModal');
  }

  /**
   *  Save add remove modal.
   */
  saveAddRemove() {
    if (this.featureRequest.clients.length === this.clientsToRemove.length && this.clientsToAdd.length === 0) {
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast('Feature request must have at least one client', 2000);
      return;
    }
    this.loading.on();
    this.featureRequestService.addRemoveClients(
      this.featureRequest.id,
      this.clientsToRemove,
      this.clientsToAdd
    ).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction,TypeScriptUnresolvedFunction
      Materialize.toast(JSON.parse(error._body).message, 2000);
      this.addRemoveClientsModal.emit('closeModal');
      return Observable.empty();
    }).subscribe((updated: FeatureRequest)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast('Request clients updated', 2000);
      this.featureRequest.clients = updated.clients;
      this.featureRequest.modifications = updated.modifications;
      this.addRemoveClientsModal.emit('closeModal');
    });
  }

  /**
   * Priority modal save
   */
  priorityModalSave() {
    this.clientsToAdd.push({
      id: this.currentClient.id,
      priority: this.selectedPriority
    });
    this.selectedPriority = null;
    this.priorityModal.emit('closeModal');
  }

  /**
   * Handle the client add on the dropdown modal.
   * @param client the client <li> element
   */
  handleAddClient(client: any) {
    for (var i = 0; i < this.clientsSelected.length; i++) {
      //noinspection TypeScriptUnresolvedFunction
      if (this.clientsSelected[i].id === $(client).attr('data-uuid')) {
        this.currentClient = this.clientsSelected[i];
        break;
      }
    }
    this.priorityModal.emit('openModal');
  }

  /**
   * Handle the client remove on the dropdown modal.
   * @param client the client <li> element
   */
  handleRemoveClient(client: any) {
    for (var i = 0; i < this.featureRequest.clients.length; i++) {
      //noinspection TypeScriptUnresolvedFunction
      if (this.featureRequest.clients[i].client_id === $(client).attr('data-uuid')) {
        if (this.clientsToRemove.indexOf(this.featureRequest.clients[i].client_id) === -1) {
          this.clientsToRemove.push(this.featureRequest.clients[i].client_id);
          return;
        }
      }
    }
    var clientToRemove: any = {};
    for (var i = 0; i < this.clientsToAdd.length; i++) {
      //noinspection TypeScriptUnresolvedFunction
      if (this.clientsToAdd[i].id === $(client).attr('data-uuid')) {
        clientToRemove = this.clientsToAdd[i];
      }
    }
    this.clientsToAdd.splice(this.clientsToAdd.indexOf(clientToRemove), 1);
  }

  /**
   * Used to get the {@link _nameSearch}
   * @returns {string}
   */
  get nameSearch() {
    return this._nameSearch;
  }

  /**
   * Used to set {@link _nameSearch} and filter the clients on change.
   * @param value
   */
  set nameSearch(value: string) {
    this.filterClients(value);
    this._nameSearch = value;
  }

  /**
   * Filter the clients and return the first 6 (we don't want the list to be very bih)
   * @param value
   */
  filterClients(value: string) {
    this.clientsTmp = [];
    if (typeof value !== 'undefined') {
      value = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    this.clients.forEach((item: Client)=> {
      let pattern = '^.*' + value + '.*$';
      if ((item.name.match(new RegExp(pattern, 'ig')) ||
        item.description.match(new RegExp(pattern, 'ig'))) &&
        this.clientsSelected.indexOf(item) === -1) {
        this.clientsTmp.push(item);
      }
    });
    this.clientsTmp = this.clientsTmp.slice(0, 6);
  }

  /**
   * On Description change
   * @param a new description
   */
  descriptionChanged(a: string) {
    this.featureRequestTmp.description = a;
  }

  /**
   * Finds the modifications of the update.
   */
  findModifications() {
    if (this.featureRequestTmp.title !== this.featureRequest.title) {
      this.featureRequestTmp.modifications.push(MODIFICATIONS.TITLE_UPDATE);
    }
    if (this.featureRequestTmp.description !== this.featureRequest.description) {
      this.featureRequestTmp.modifications.push(MODIFICATIONS.DESCRIPTION_UPDATE);
    }
    if (this.selectedProductArea !== this.featureRequest.product_area_id) {
      this.featureRequestTmp.modifications.push(MODIFICATIONS.PRODUCT_ARE_UPDATE);
    }
    if (this.featureRequestTmp.ticket_url !== this.featureRequest.ticket_url) {
      this.featureRequestTmp.modifications.push(MODIFICATIONS.TICKET_URL_UPDATE);
    }
  }

  /**
   * Send a new comment/
   */
  sendComment() {
    let id = new JwtHelper().decodeToken(localStorage.getItem('id_token')).id;
    this.loading.on();
    this.featureRequestService.addComment(this.featureRequest.id, id, this.comment).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction,TypeScriptUnresolvedFunction
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe((updated: FeatureRequest)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast('Request clients updated', 2000);
      this.featureRequest.comments = updated.comments;
      this.comment = null;
    });
  }

  /**
   * Only for demo purpose
   * @param username the user username
   * @returns {boolean} if it is a demo user.
   */
  isDemoUser(username:string) {
    return this.demo.isDemoUser(username);
  }

  /**
   * Only for demo purpose
   * @param name the client name
   * @returns {boolean} if it is a demo client.
   */
  isDemoClient(name:string) {
    return this.demo.isDemoClient(name);
  }
}
