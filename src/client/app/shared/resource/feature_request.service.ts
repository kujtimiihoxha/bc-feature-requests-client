/**
 * Created by refresh on 9/5/16.
 */
/**
 * Created by refresh on 9/1/16.
 */
import {Http, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseResource} from './base.service';
import {FeatureRequest, FilterResponse, FeatureRequestFilter} from '../model/index';
import {Observable} from 'rxjs/Rx';
import {FeatureRequestUpdateDetails} from '../model/feature_request.model';
@Injectable()
export class FeatureRequestService extends BaseResource<FeatureRequest> {
  constructor(protected http: Http) {
    super(http, 'feature-requests');
  }
  updateTargetDate(id:string, newDate: string) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.put(this.url + `/${id}/date`, JSON.stringify({
      target_date:newDate
    }), this.options).map(this.extractData);
  }
  updateDetails(id:string,details: FeatureRequestUpdateDetails) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.put(this.url + `/${id}`, JSON.stringify(details), this.options).map(this.extractData);
  }
  updateState(id:string,state:number) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.put(this.url + `/${id}/state/${state}`, {}, this.options).map(this.extractData);
  }
  addRemoveClients(id:string, clientsToRemove:string[], clientsToAdd:{id:string,priority:number}[]) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.post(this.url + `/${id}/clients`, {
      clients_to_add: clientsToAdd,
      clients_to_remove: clientsToRemove
    }, this.options).map(this.extractData);
  }
  addComment(id:string, userId:string[], comment:string) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.post(this.url+ `/${id}/comments`, {
      user_id:userId,
      comment:comment
    }, this.options).map(this.extractData);
  }
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
