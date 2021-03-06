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
import {BreadcrumbService} from './breadcrumb.service';
import {AuthService} from "../auth/auth.service";

/**
 * BreadcrumbComponent.
 * Displays the current location in the header.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component(
  {
    moduleId: module.id,
    selector: 'bc-breadcrumb',
    templateUrl: 'breadcrumb.component.html',
    styleUrls: ['breadcrumb.component.css'],
  }
)
export class BreadcrumbComponent {
  displayNotifications = false
  constructor(private breadcrumb: BreadcrumbService, auth: AuthService) {
    this.displayNotifications = auth.user().role !== 3;
  }
}
