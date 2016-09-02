import { Component, OnInit } from '@angular/core';
import { BreadcrumbService} from '../shared/index';

/**
 * This class represents the lazy loaded FeatureRequestsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-feature-requests',
  templateUrl: 'feature_requests.component.html',
  styleUrls: ['feature_requests.component.css'],
})

export class FeatureRequestsComponent implements OnInit {

  /**
   * Creates an instance of the FeatureRequestsComponent with the injected
   * BreadcrumbService.
   *
   * @param {BreadcrumbService} breadcrumb - The injected BreadcrumbService.
   */
  constructor(private breadcrumb:BreadcrumbService) {}

  /**
   * Set the breadcrumb OnInit
   */
  ngOnInit() {
    this.breadcrumb.items=["Feature Requests"]
  }
}
