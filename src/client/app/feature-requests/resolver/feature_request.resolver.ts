/**
 * Created by refresh on 9/5/16.
 */

import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {FeatureRequest, FeatureRequestService} from "../../shared/index";

@Injectable()
export class FeatureRequestResolver implements Resolve<FeatureRequest> {
  constructor(private featureRequestService: FeatureRequestService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<FeatureRequest> {
    return this.featureRequestService.getById(route.params['id'])
  }
}
