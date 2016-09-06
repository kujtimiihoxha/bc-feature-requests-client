/**
 * Created by refresh on 9/5/16.
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {FeatureRequest,FilterResponse, FeatureRequestService, FeatureRequestFilter} from "../../shared/index";

@Injectable()
export class FeatureRequestsResolver implements Resolve<FilterResponse<FeatureRequest>> {
  constructor(
    private featureRequestService: FeatureRequestService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<FilterResponse<FeatureRequest>> {
    return this.featureRequestService.getWithFilter(new FeatureRequestFilter().getDefaultFilter())
  }
}
