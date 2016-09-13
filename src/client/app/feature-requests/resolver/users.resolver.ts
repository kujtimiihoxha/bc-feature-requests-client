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
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {User, UserService, AuthService} from '../../shared/index';

/**
 * ProductAreasResolver.
 * Get all product areas from the server.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
@Injectable()
export class UsersResolver implements Resolve<User[]> {

  /**
   * Constructor that injects the users(employs) service.
   * @param userService used to get the users.
   */
  constructor(private userService: UserService, private auth: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]>|Observable<any> {
    if(!this.auth.isNotExpired()) {
      this.router.navigate(['/login']);
      return Observable.empty();
    }
    return this.userService.get();
  }
}
