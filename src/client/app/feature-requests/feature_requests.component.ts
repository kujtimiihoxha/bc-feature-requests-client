import {Component, OnInit, EventEmitter} from '@angular/core';
import {BreadcrumbService} from '../shared/index';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {
  FeatureRequest,
  ProductArea,
  LoadingService,
  FeatureRequestService,
  FeatureRequestFilter,
  FilterResponse,
  Client,
  User,
} from '../shared/index';
declare const Materialize: any;
declare const $: any;

/**
 * This class represents the lazy loaded FeatureRequestsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-feature-requests',
  templateUrl: 'feature_requests.component.html',
})
export class FeatureRequestsComponent implements OnInit {
  /**
   * The total number of items in the DB that match the {@link FeatureRequestFilter} sent to the server,
   *  total is different than {@link #featureRequests} length because of the pagination feature.
   */
  total: number;
  /**
   * FeatureRequest list.
   * The list of the feature requests that will be added to the table.
   */
  featureRequests: FeatureRequest[];

  /**
   * ProductArea list.
   * Contains all the product areas.
   * It is used to store product areas for filtering,
   *  and other places where product areas are needed to be displayed on the table.
   *  (todo: if the product area list gets very long make a search query on the backend not frontend)
   */
  productAreas: ProductArea[ ];

  /**
   * Clients list.
   * Contains all the clients.
   * It is used to store clients for filtering,
   *  and other places where clients are needed to be displayed on the table.
   *  (todo: if the client list gets very long make a search query on the backend not frontend)
   */
  clients: Client[ ];

  /**
   * Users list.
   * Contains all the users.
   * It is used to store users for filtering,
   *  and other places where users are needed to be displayed on the table.
   *  (todo: if the user list gets very long make a search query on the backend not frontend)
   */
  users: User[ ];

  /**
   * The feature request filter.
   */
  filter =  FeatureRequestFilter.getDefaultFilter();

  /**
   * Is emitted when the filter has changed, resets the page list.
   * @type {EventEmitter<void>}
   */
  resetPage= new EventEmitter<void>();

  /**
   * Constructor that injects necessary injectable classes.
   * @param router used to navigate to request details
   * @param breadcrumb used to set the main header breadcrumb
   * @param loading used to display loading when requesting data from the server.
   * @param featureRequestService used to get filtered feature requests
   * @param route used to get the initial data (feature requests with default filter,users,clients,product areas)
   */
  constructor(
    private router: Router,
    private breadcrumb: BreadcrumbService,
    private loading: LoadingService,
    private featureRequestService: FeatureRequestService,
    private route: ActivatedRoute) { }

  /**
   * Initiates the data from the resolvers data,
   *  update the breadcrumb.
   */
  ngOnInit() {
    this.breadcrumb.items = ['Feature Requests'];
    this.featureRequests = this.route.snapshot.data['featureRequests'].data;
    this.total = this.route.snapshot.data['featureRequests'].total;
    this.productAreas = this.route.snapshot.data['productAreas'];
    this.clients = this.route.snapshot.data['clients'];
    this.users = this.route.snapshot.data['users'];
    // prevents the dropdown from closing on click.
    $('.dropdown-content').on('click touchstart', (e: any) => {
      e.stopPropagation();
    });
  }

  /**
   * Send a request wil filter.
   * @param keepPage if true the page will be not updated updated.
   */
  sendFilterRequest(keepPage: boolean = false) {
    if (!keepPage) {
      this.filter.skip = 0;
      this.resetPage.emit();
    }
    this.loading.on();
    this.featureRequestService.getWithFilter(this.filter).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe((response: FilterResponse<FeatureRequest>)=> {
      this.featureRequests = response.data;
      this.total = response.total;
      this.loading.off();
    });
  }

  /**
   * On details event go to the details route.
   * @param id the feature request id.
   */
  onDetails(id: string) {
    this.router.navigate([`bc/details/${id}`]);
  }

  /**
   * Get the page from the DB.
   */
  onPageChanged() {
    this.sendFilterRequest(true);
  }

  /**
   * Change the filter.
   */
  onFilterChanged() {
    this.sendFilterRequest(false);
  }
}
