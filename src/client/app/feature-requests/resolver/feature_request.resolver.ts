/**
 * Copyright [2016] [Kujtim Hoxha]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {FeatureRequest, FeatureRequestService} from '../../shared/index';

/**
 * FeatureRequestResolver.
 * Get one feature request from the server.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
@Injectable()
export class FeatureRequestResolver implements Resolve<FeatureRequest> {

  /**
   * Constructor that injects the feature request service.
   * @param featureRequestService used to get the feature request.
   */
  constructor(private featureRequestService: FeatureRequestService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<FeatureRequest> {
    return this.featureRequestService.getById(route.params['id']);
  }
}
