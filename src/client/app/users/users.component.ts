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
import {Component, OnInit} from '@angular/core';
import {User, BreadcrumbService} from '../shared/index';
import {ActivatedRoute} from '@angular/router';
/**
 * UsersComponent.
 * Display list of users (employees)
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-users',
  templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit {

  /**
   * Table data.
   */
  users: User[];

  /**
   * Injects active route.
   * @param route used to get resolver data.
   * @param breadcrumb used to update the breadcrumb of the header.
   */
  constructor(private route: ActivatedRoute, private breadcrumb: BreadcrumbService) {}

  /**
   * Initializes users.
   */
  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'];
    this.breadcrumb.setItems(['Users']);
  }

}
