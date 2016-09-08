import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FeatureRequestFilter} from '../shared/model/feature_request_filter';
import {Client} from '../shared/model/client.model';
import {User} from '../shared/model/user.model';
import {ProductArea} from '../shared/model/product_area.model';
declare const $: any;
/**
 * This class represents the lazy loaded FeatureRequestsTableComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-feature-requests-filter',
  templateUrl: 'feature_requests_filter.component.html',
  styleUrls: ['feature_requests_filter.component.css'],
})
export class FeatureRequestsFilterComponent {
  /**
   * The local feature request filter.
   */
  _filter: FeatureRequestFilter;

  /**
   * Value of filter nav bar show/hide.
   * @type {boolean}
   * @private
   */
  _showFilter:boolean = false;

  /**
   * Filter nave show/hide class.
   * @type {{hide: boolean}}
   */
  filterNavCls:{[key:string]:boolean} = {
    'hide': ! this.showFilterNav
  };
  /**
   * Employ search string.
   * @type {string}
   */
  employSearch:string = '';

  /**
   * Product area search string.
   * @type {string}
   */
  productAreaSearch:string = '';

  /**
   * Client search string.
   * @type {string}
   */
  clientSearch:string = '';

  /**
   *  Should the filter nav bar be shown
   */
  get showFilterNav():boolean{
    return this._showFilter;
  };

  /**
   *  Set the filter nav bar show/hide class and value.
   * @param value the value to be set.
   */
  set showFilterNav(value: boolean) {
    this._showFilter = value;
    this.filterNavCls['hide'] = !value;
  }

  /**
   *  The filter used for bidirectional binding.
   * @returns {FeatureRequestFilter}
   */
  get filter(): FeatureRequestFilter {
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
   *  FilterChanged event emitter.
   *  Is Emitted when the filter of the table is changed.
   */
  @Output() filterChanged: EventEmitter<void> = new EventEmitter<void>();


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
   *  The filter list to be displayed.
   */
  filterOptions: [{label: string,activates: string,cls: {[key: string]: boolean}}] = [
    {
      label: 'Employ',
      activates: 'employ_dropdown',
      cls: {'employ-filter-btn': true},
    },
    {
      label: 'Product Area',
      activates: 'product_area_dropdown',
      cls: {'product-area-filter-btn': true},
    },
    {
      label: 'Client',
      activates: 'client_dropdown',
      cls: {'client-filter-btn': true},
    },
    {
      label: 'Priority',
      activates: 'priority_dropdown',
      cls: {'priority-filter-btn': true, 'hide': true},
    },
  ];

  /**
   * Show only the requests that are open.
   */
  showOnlyOpenRequests(): void {
    if (this.filter.closed === 2) {
      this.filter.closed = 0;
      this.filterChanged.emit();
      return;
    }
    this.filter.closed = 2;
    this.filterChanged.emit();
  }

  /**
   * Show only the requests that are closed.
   */
  showOnlyClosedRequests(): void {
    if (this.filter.closed === 1) {
      this.filter.closed = 0;
      this.filterChanged.emit();
      return;
    }
    this.filter.closed = 1;
    this.filterChanged.emit();
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
   * Resets the filter to the default filter
   */
  clearFilter() {
    let fl = FeatureRequestFilter.getDefaultFilter();
    this.filter.client = fl.client;
    this.filter.closed = fl.closed;
    this.filter.product_area = fl.product_area;
    this.filter.employ = fl.employ;
    this.filter.get = fl.get;
    this.filter.priority_dir = fl.priority_dir;
    this.filter.field = fl.field;
    this.filter.skip = fl.skip;
    this.filter.get = fl.get;
    this.filter.dir = fl.dir;
    this.filterOptions[3].cls['hide'] = true;
    this.showFilterNav = false;
    this.filterChanged.emit();
  }

  /**
   * Filter requests by the employ that submitted the request.
   * @param id the employ id.
   */
  filterByEmploy(id: string) {
    this.filter.employ = id;
    //noinspection TypeScriptUnresolvedFunction
    $('.employ-filter-btn').dropdown('close');
    this.filterChanged.emit();
  }

  /**
   * Filter requests by the client who requested the feature.
   * @param id the client id
   */
  filterByClient(id: string) {
    this.filter.client = id;
    this.filterOptions[3].cls['hide'] = false;
    //noinspection TypeScriptUnresolvedFunction
    $('.client-filter-btn').dropdown('close');
    this.filterChanged.emit();
  }

  /**
   * Filter requests by the product area.
   * @param id the product area id
   */
  filterByProductArea(id: string) {
    this.filter.product_area = id;
    //noinspection TypeScriptUnresolvedFunction
    $('.product-area-filter-btn').dropdown('close');
    this.filterChanged.emit();
  }

  /**
   * Filter requests by the selected client priority.
   * @param dir the priority direction
   */
  filterByClientPriority(dir: string) {
    this.filter.priority_dir = dir;
    this.filter.field = null;
    this.filter.dir = null;
    //noinspection TypeScriptUnresolvedFunction
    $('.priority-filter-btn').dropdown('close');
    this.filterChanged.emit();
  }

  /**
   *  A html interpretation of the current filter. (TODO improve this format.)
   */
  getFilterSummary():string {
    let filterString = '';
    if (typeof this.filter.employ !== 'undefined') {
      this.users.forEach((user: User)=> {
        if (user.id === this.filter.employ) {
          filterString += 'Employ:  <b>' + user.username + '</b>, ';
        }
      });
    }
    if (typeof this.filter.product_area !== 'undefined') {
      filterString += 'Product Area: <b>' + this.getProductAreaName(this.filter.product_area) + '</b>, ';
    }
    if (typeof this.filter.client !== 'undefined') {
      filterString += 'Client: <b>' + this.getClientName(this.filter.client) + '</b>, ';
      if (typeof this.filter.priority_dir !== 'undefined') {
        filterString += ' Priority: <b>' + this.filter.priority_dir + '</b>';
      }
    }
    if (filterString !== '') {
      return 'Filter: ' + filterString;
    }
    return filterString;
  }

  sort(field: string, dir: string) {
    this.filter.priority_dir = null;
    this.filter.field = field;
    this.filter.dir = dir;
    //noinspection TypeScriptUnresolvedFunction
    $('.sort').dropdown('close');
    this.filterChanged.emit();
  }
}
