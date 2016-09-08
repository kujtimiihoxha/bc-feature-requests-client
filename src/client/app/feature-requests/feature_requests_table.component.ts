import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {Client, User, ProductArea, FeatureRequest} from '../shared/index';
import {DateHelper} from '../shared/helpers/date.helper';
import {FeatureRequestFilter} from '../shared/model/feature_request_filter';
/**
 * This class represents the lazy loaded FeatureRequestsTableComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-feature-requests-table',
  templateUrl: 'feature_requests_table.component.html',
  styleUrls: ['feature_requests_table.component.css'],
})
export class FeatureRequestsTableComponent implements OnInit {

  /**
   * FeatureRequest list.
   * The list of the feature requests that will be added to the table.
   */
  @Input() featureRequests: FeatureRequest[];
  /**
   * The total number of items in the DB that match the {@link FeatureRequestFilter} sent to the server,
   *  total is different than {@link #featureRequests} length because of the pagination feature.
   */
  @Input() total: number;

  /**
   * The local feature request filter.
   */
  _filter: FeatureRequestFilter;

  /**
   *  The filter used for bidirectional binding.
   * @returns {FeatureRequestFilter}
   */
  get filter(): FeatureRequestFilter{
    return this._filter;
  }

  /**
   *  The filter used for bidirectional binding.
   */
  @Input()
  set filter(value: FeatureRequestFilter) {
    this._filter = value;
  }

  /**
   * Reset page emitter will be triggered by the filter.
   * Used to set the page to 1 if filter changed.
   */
  @Input() resetPage: EventEmitter<void>;
  /**
   * The current page of the table.
   * Used for pagination.
   */
  currentPage: number = 1;

  /**
   * Clients list.
   * Contains all the clients.
   * It is used to store clients for filtering,
   *  and other places where clients are needed to be displayed on the table.
   */
  @Input() clients: Client[ ];

  /**
   * Users list.
   * Contains all the users.
   * It is used to store users for filtering,
   *  and other places where users are needed to be displayed on the table.
   */
  @Input() users: User[ ];

  /**
   * ProductArea list.
   * Contains all the product areas.
   * It is used to store product areas for filtering,
   *  and other places where product areas are needed to be displayed on the table.
   */
  @Input() productAreas: ProductArea[ ];

  /**
   *  OnDetails event emitter.
   *  Is Emitted when one feature request is selected (click on title, or icon).
   */
  @Output() details: EventEmitter<string> = new EventEmitter<string>();

  /**
   *  PageChanged event emitter.
   *  Is Emitted when the page of the table is changed.
   */
  @Output() pageChanged: EventEmitter<void> = new EventEmitter<void>();

  /**
   * This function is called when one list member is selected.
   * @param id the feature request id.
   */
  onDetails(id: string): void {
    this.details.emit(id);
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
    return `${day} ${dayDate} ${month} ${year}`;
  }

  totalPages() {
    let pages = 0;
    let module = this.total % this.filter.get;
    if (module !== 0) {
      pages++;
    }
    pages += Math.floor(this.total / this.filter.get);
    return Array(pages).fill(1).map((x, i)=>i);
  }

  goToPage(page: number) {
    if (page > this.totalPages().length || page < 1) {
      return;
    }
    this.currentPage = page;
    this.filter.skip = (page - 1) * this.filter.get;
    this.pageChanged.emit();
  }
  ngOnInit(): void {
    this.resetPage.subscribe(()=> {
      this.currentPage = 1;
    });
  }
}
