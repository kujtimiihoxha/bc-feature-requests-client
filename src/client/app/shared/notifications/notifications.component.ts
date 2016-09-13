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
import {Component, OnInit} from "@angular/core";
import {NotificationsService} from "./notifications.service";
import {AuthService} from "../auth/auth.service";
import {Notifications} from "./notifications.model";
declare const $:any;
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
    selector: 'bc-notifications',
    templateUrl: 'notifications.component.html'
  }
)
export class NotificationsComponent implements OnInit {
  viewed = false;

  constructor(private notificationsService: NotificationsService, private auth: AuthService) {
  }

  get notifications() {
    return this.notificationsService.notifications;
  }

  ngOnInit(): void {
    this.notificationsService.getNotifications(this.auth.user().id).subscribe((notifications: Notifications[])=> {
      this.notificationsService.setNotifications(notifications)
    })
  }
  closeDropdown(){
    $('.notification-btn').dropdown('close');
  }
  readNotifications(){
    this.viewed = true;
  }
}
