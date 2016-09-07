/**
 * Created by refresh on 9/7/16.
 */
import {Component, OnInit} from "@angular/core";
import {BreadcrumbService} from "../../shared/breadcrumb/breadcrumb.service";
import {FeatureRequest} from "../../shared/model/feature_request.model";
import {ActivatedRoute} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: 'bc-feature-request-details',
  templateUrl: 'feature_request_details.component.html',
  styleUrls: ['feature_request_details.component.css'],
})
export class FeatureRequestDetailsComponent implements OnInit {
  featureRequest: FeatureRequest

  constructor(private breadcrumb: BreadcrumbService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.featureRequest = this.route.snapshot.data['featureRequest']
    this.breadcrumb.setItems(['Feature Requests', 'Details'])
  }

}
