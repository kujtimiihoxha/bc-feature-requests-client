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
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {DemoHelper} from '../index';
/**
 * SideNavComponent.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})

export class SideNavComponent {
  /**
   * Decodes the token.
   */
  jwtHelper: JwtHelper = new JwtHelper();

  /**
   * Logged in user firstName
   */
  firstName: string;

  /**
   * Logged in user lastName
   */
  lastName: string;

  /**
   * Logged in user email
   */
  email: string;

  /**
   * Logged in user username
   */
  username: string;

  /**
   * Logged in user role
   */
  role: number;
  /**
   * Only for demo purpose.
   */
  demo: DemoHelper = new DemoHelper();

  /**
   * Injects the router.
   * Init user data.
   * @param router used to get to login after logout click.
   */
  constructor(private router: Router) {
    this.firstName = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).firstname;
    this.lastName = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).lastname;
    this.email = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).email;
    this.username = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).username;
    this.role = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).role;
  }

  /**
   * Logout.
   */
  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }

  /**
   * Only for demo purpose
   * @param username the user username
   * @returns {boolean} if it is a demo user.
   */
  isDemoUser(username: string) {
    return this.demo.isDemoUser(username);
  }
}
