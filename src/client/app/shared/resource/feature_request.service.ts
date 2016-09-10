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
import {Http, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseResource} from './base.service';
import {FeatureRequest, FilterResponse, FeatureRequestFilter} from '../model/index';
import {Observable} from 'rxjs/Rx';
import {FeatureRequestUpdateDetails} from '../model/feature_request.model';
/**
 * Feature request service.
 *
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
@Injectable()
export class FeatureRequestService extends BaseResource<FeatureRequest> {
  /**
   * Injects http service.
   * @param http http service.
   */
  constructor(protected http: Http) {
    super(http, 'feature-requests');
  }

  /**
   * Update the target date.
   * @param id of feature request to update.
   * @param newDate the new target date.
   * @returns {Observable<FeatureRequest>}
   */
  updateTargetDate(id:string, newDate: string) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.put(this.url + `/${id}/date`, JSON.stringify({
      target_date:newDate
    }), this.options).map(this.extractData);
  }

  /**
   * Update the details.
   * @param id of feature request to update.
   * @param details new details.
   * @returns {Observable<FeatureRequest>}
   */
  updateDetails(id:string,details: FeatureRequestUpdateDetails) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.put(this.url + `/${id}`, JSON.stringify(details), this.options).map(this.extractData);
  }

  /**
   * Update open/close state.
   * @param id of feature request to update.
   * @param state new state.
   * @returns {Observable<FeatureRequest>}
   */
  updateState(id:string,state:number) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.put(this.url + `/${id}/state/${state}`, {}, this.options).map(this.extractData);
  }

  /**
   * Add or remove client.
   * @param id of feature request to update.
   * @param clientsToRemove clients to remove.
   * @param clientsToAdd clients to add
   * @returns {Observable<FeatureRequest>}
   */
  addRemoveClients(id:string, clientsToRemove:string[], clientsToAdd:{id:string,priority:number}[]) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.post(this.url + `/${id}/clients`, {
      clients_to_add: clientsToAdd,
      clients_to_remove: clientsToRemove
    }, this.options).map(this.extractData);
  }

  /**
   * Add employ comment.
   * @param id of feature request to add comment to.
   * @param userId the employ id.
   * @param comment the comment.
   * @returns {Observable<FeatureRequest>}
   */
  addComment(id:string, userId:string[], comment:string) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.post(this.url+ `/${id}/comments`, {
      user_id:userId,
      comment:comment
    }, this.options).map(this.extractData);
  }

  /**
   * Get feature requests with filter.
   * @param filter the filter to apply;
   * @returns {Observable<FilterResponse<FeatureRequest>>}
   */
  getWithFilter(filter: FeatureRequestFilter): Observable<FilterResponse<FeatureRequest>> {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    let params: URLSearchParams = new URLSearchParams();
    for (var k in filter) {
      if (typeof filter[k] !== 'undefined' && typeof filter[k] !== 'function') {
        params.set(k, filter[k]);
      }
    }
    this.options.search = params;
    return this.http.get(this.url, this.options).map(this.extractData);
  }
}
