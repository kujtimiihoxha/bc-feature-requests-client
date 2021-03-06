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
import {BaseResource, User} from '../shared/index';
import {UserRegistrationModel,ClientRegistrationModel} from './index';
/**
 * RegisterService.
 * Used to send the register request.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Injectable()
export class RegisterService extends BaseResource<User> {
  /**
   * Injects http service.
   * @param http http service.
   */
  constructor(protected http: Http) {
    super(http, 'auth/register');
  }

  /**
   * Send the register request.
   * @param model the reququest model.
   * @returns {Observable<R>} request observable.
   */
  register(model: UserRegistrationModel) {
    return this.http.post(this.url, JSON.stringify(model), this.options)
      .map(this.extractData);
  }
  /**
   * Send the register request.
   * @param model the reququest model.
   * @returns {Observable<R>} request observable.
   */
  registerClient(model: ClientRegistrationModel) {
    return this.http.post(this.url+"/client", JSON.stringify(model), this.options)
      .map(this.extractData);
  }

}
