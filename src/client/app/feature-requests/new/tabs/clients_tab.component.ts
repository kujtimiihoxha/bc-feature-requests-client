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
import {Component, Input, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import {Client, FeatureRequest, DemoHelper} from '../../../shared/index';
import {DragulaService} from 'ng2-dragula/src/app/providers/dragula.provider';
declare const $: any;

/**
 * ClientTab component.
 * Used by new feature request component.
 * This tab is used to add clients to the feature request.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-fr-clients',
  templateUrl: 'clients_tab.component.html',
  styleUrls: ['clients_tab.component.css']
})
export class ClientsTabComponent implements OnInit, OnDestroy {
  /**
   * The feature request that will be sent to the server.
   */
  @Input() details: FeatureRequest;

  /**
   * The details changed event emitter, used for bidirectional binding.
   */
  @Output() detailsChange: EventEmitter<FeatureRequest> = new EventEmitter<FeatureRequest>();

  /**
   * On next event emitter, is emitted when the next button is clicked.
   */
  @Output() onNext: EventEmitter<void> = new EventEmitter<void>();

  /**
   * On previous event emitter, is emitted when the previous button is clicked.
   */
  @Output() onPrevious: EventEmitter<void> = new EventEmitter<void>();

  /**
   * The list of all the clients.
   */
  @Input() clients: Client[];

  /**
   * The current client that is dropped.
   */
  currentClient: Client;

  /**
   * The clients lise based on the search, will show only the first six results.
   */
  clientsTmp: Array<Client> = null;

  /**
   * The client that are dropped in the drop area.
   */
  clientsSelected: Array<Client> = [];

  /**
   * The client search query.
   * @private
   */
  _nameSearch: string = '';

  /**
   * Event emitter used to close/open priority modal.
   */
  modalActions: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The selected priority.
   * Is reset for ech client.
   */
  selectedPriority: number;

  /**
   * The dragula event subscription.
   * We use this to unsubscribe onDestroy
   */
  subscription: any;

  /**
   * Only for demo purpose.
   */
  demo: DemoHelper = new DemoHelper();

  /**
   * Constructor injects the dragulaService to subscribe to drop events.
   *
   * @param dragulaService the dragula service.
   */
  constructor(private dragulaService: DragulaService) {
    this.subscription = dragulaService.dropModel.subscribe((value: any) => {
      let fromContainer = value.splice(3);
      let ToContainer = value.splice(2);
      //noinspection TypeScriptUnresolvedFunction
      if ($(fromContainer).attr('data-container') === 'parent'
        && $(ToContainer).attr('data-container') !== 'parent') {
        this.handleAdd(value.slice(1));
        this.filterClients(this._nameSearch);
      } else if ($(fromContainer).attr('data-container')
        !== 'parent' && $(ToContainer).attr('data-container') === 'parent') {
        this.handleRemove(value.slice(1));
        this.filterClients(this._nameSearch);
      }
    });
  }

  handleAdd(client: any) {
    this.clientsSelected.forEach((cl: Client)=> {
      //noinspection TypeScriptUnresolvedFunction
      if (cl.id === $(client).attr('data-uuid')) {
        this.currentClient = cl;
      }
    });
    this.modalActions.emit('openModal');
  }

  handleRemove(client: any) {
    var toRemove: any = {};
    this.details.clients.forEach((item: any)=> {
      //noinspection TypeScriptUnresolvedFunction
      if (item.client_id === $(client).attr('data-uuid')) {
        toRemove = item;
      }
    });
    this.details.clients.splice(this.details.clients.indexOf(toRemove), 1);

  }

  /**
   * Initiates the temporary client list, only first 6 clients.
   */
  ngOnInit() {
    if (this.clientsTmp === null) {
      this.clientsTmp = this.clients.slice(0, 6);
    }
  }

  /**
   * Unsubscribe to the drop event.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Go to the next tab.
   */
  next() {
    this.onNext.emit();
  }

  /**
   * Fo tho the previouse tab.
   */
  previous() {
    this.onPrevious.emit();
  }

  /**
   * Returns the search query value.
   */
  get nameSearch() {
    return this._nameSearch;
  }

  /**
   * Sets the search query value and filters the list.
   * @param value the new value.
   */
  set nameSearch(value: string) {
    this.filterClients(value);
    this._nameSearch = value;
  }

  /**
   * Filter the list based on the search query, case insensitive.
   * Return the first 6 matches.
   * @param value the search query value.
   */
  filterClients(value: string) {
    this.clientsTmp = [];
    this.clients.forEach((item: Client)=> {
      let pattern = '^.*' + value + '.*$';
      if ((item.name.match(new RegExp(pattern, 'ig'))
        || item.description.match(new RegExp(pattern, 'ig')))
        && this.clientsSelected.indexOf(item) === -1) {
        this.clientsTmp.push(item);
      }
    });
    this.clientsTmp = this.clientsTmp.slice(0, 6);
  }

  /**
   * Save the priority and push the new client to the clients list.
   */
  savePriorityModel() {
    this.details.clients.push({
      name: this.currentClient.name,
      client_id: this.currentClient.id,
      priority: this.selectedPriority
    });
    this.currentClient = null;
    this.selectedPriority = null;
    this.modalActions.emit('closeModal');
  }

  /**
   * Only for demo purpose
   * @param name the client name
   * @returns {boolean} if it is a demo client.
   */
  isDemoClient(name: string) {
    return this.demo.isDemoClient(name);
  }
}
