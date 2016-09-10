import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {
  Client,
  ProductArea,
  FeatureRequest,
  BreadcrumbService,
  FeatureRequestService,
  LoadingService
} from '../../shared/index';
declare const Materialize: any;
/**
 *
 * NewFeatureRequestComponent.
 * Used for the '/bc/new' route.
 * It is the entry point for creating a new feature request.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/7/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-add-feature-request',
  templateUrl: 'new_feature_request.component.html',
  styleUrls: ['new_feature_request.component.css']
})
export class NewFeatureRequestComponent implements OnInit {

  /**
   * Current tab.
   * Holds the current active tab.
   * @type {number}
   */
  currentTab:number = 1;

  /**
   * Feature request details to be sent to the server.
   * @type {FeatureRequest}
   */
  details:FeatureRequest = new FeatureRequest();

  /**
   * Available clients list.
   */
  clients: Array<Client> = [];

  /**
   * Available product areas list.
   */
  productAreas: Array<ProductArea> = [];


  /**
   * Constructor that injects necessary injectable classes.
   * Initiate empty clients array.
   *
   * @param breadcrumb used to update header breadcrumb
   * @param route used to get the data from resolvers.
   * @param router used to navigate to the feature request list after succesfull insert.
   * @param featureRequestService used to send requests to the server.
   * @param loading used to display loading during transaction.
   */
  constructor(
    private breadcrumb: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private featureRequestService: FeatureRequestService,
    private loading: LoadingService
  ) {
    this.details.clients = [];
  }

  /**
   * Set the breadcrumb OnInit
   */
  ngOnInit() {
    this.breadcrumb.items = ['Feature Requests', 'Create New'];
    this.clients = this.route.snapshot.data['clients'];
    this.productAreas = this.route.snapshot.data['productAreas'];
  }

  /**
   * Hide tab that is not active
   * @param tab
   */
  isMyTab(tab: number) {
    if (this.currentTab === tab) {
      return {
        'display': 'block'
      };
    }
    return {
      'display': 'none'
    };
  }

  /**
   * Increase the current tab number.
   */
  next() {
    this.currentTab++;
  }

  /**
   * Send the new feature request to the server.
   */
  submit() {
    this.loading.on();
    this.featureRequestService.post(this.details).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe(()=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast('Feature request added', 2000);
      this.router.navigate(['/']);
    });
  }

  /**
   * Decrease the current tab number.
   */
  previous() {
    this.currentTab--;
  }
}
