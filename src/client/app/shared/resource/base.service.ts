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

import {Http, Headers, RequestOptions} from '@angular/http';
import {Config} from '../config/env.config';
import {Observable} from 'rxjs/Rx';

/**
 * BaseService.
 * All services extend this class
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
export class BaseResource<Model> {
  /**
   * The api endpoint.
   */
  protected url = Config.API;

  /**
   * Default headers.
   * @type {Headers}
   */
  protected headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
  });
  /**
   * Default options.
   * @type {RequestOptions}
   */
  protected options = new RequestOptions({headers: this.headers});

  /**
   * Sets the resource url, and http service.
   * @param http used to send the request.
   * @param path used to create url.
   */
  constructor(protected http: Http, private path: string) {
    this.url = this.url + path;
  }

  /**
   * Get item by id.
   * @param id the id of the item.
   * @returns {Observable<R>} request observable.
   */
  getById(id: string): Observable<Model> {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.get(this.url + '/' + id, this.options)
      .map(this.extractData);
  }

  /**
   * Get all items.
   * @returns {Observable<R>} request observable.
   */
  get(): Observable<Model[]> {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.get(this.url, this.options)
      .map(this.extractData);
  }

  /**
   * Update one item.
   * @param id item id.
   * @param model updated model.
   * @returns {Observable<R>} request observable.
   */
  put(id:string, model: Model) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.put(this.url+`/${id}`, JSON.stringify(model), this.options)
      .map(this.extractData);
  }

  /**
   *
   * @param id
   * @returns {Observable<R>}
   */
  delete(id: string) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.delete(this.url + '/' + id, this.options)
      .map(this.extractData);
  }

  post(model: Model) {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.post(this.url, JSON.stringify(model), this.options)
      .map(this.extractData);
  }

  protected extractData(res: any) {
    let body = res.json();
    return body || {};
  }
}
