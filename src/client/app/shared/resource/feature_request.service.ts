/**
 * Created by refresh on 9/5/16.
 */
/**
 * Created by refresh on 9/1/16.
 */
import {Http, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import {BaseResource} from "./base.service";
import {FeatureRequest, FilterResponse, FeatureRequestFilter} from "../model/index";
import {Observable} from 'rxjs/Rx';
@Injectable()
export class FeatureRequestService extends BaseResource<FeatureRequest> {
  constructor(protected http: Http){
    super(http,"feature-requests")
  }
  getWithFilter(filter: FeatureRequestFilter):Observable<FilterResponse<FeatureRequest>> {
    let params: URLSearchParams = new URLSearchParams();
    for ( var k in filter){
        if ( filter[k] != null && typeof filter[k] !== 'function') {
          params.set(k,filter[k])
        }
    }
    this.options.search = params
    return this.http.get(this.url,this.options)
      .map(this.extractData);
  }
}
