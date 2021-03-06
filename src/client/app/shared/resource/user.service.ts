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
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseResource} from './base.service';
import {User} from '../model/index';
import {Observable} from 'rxjs/Rx';

/**
 * User service.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
@Injectable()
export class UserService extends BaseResource<User> {
  /**
   * Injects http service.
   * @param http http service.
   */
  constructor(protected http: Http) {
    super(http, 'users');
  }
  /**
   * Get all employs.
   * @returns {Observable<Model>} request observable.
   */
  getEmploys(): Observable<User[]> {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.get(this.url+'/employs', this.options)
      .map(this.extractData);
  }

}
